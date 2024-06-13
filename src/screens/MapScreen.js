import React, { useEffect } from 'react';
import { StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch, useSelector } from 'react-redux';
import { updateLocation } from '../store/locationSlice';


const MapScreen = () => {
  const dispatch = useDispatch();
  const { route, currentLocation } = useSelector((state) => state.location);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to track your movement.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission denied');
          return;
        }
      }
      watchPosition();
    };

    const watchPosition = () => {
      Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(updateLocation({ latitude, longitude }));
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, distanceFilter: 1, interval: 1000 }
      );
    };

    requestLocationPermission();

    return () => {
      Geolocation.clearWatch();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.7749,
          longitude: -122.4194,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {route.length > 0 && (
          <Polyline
            coordinates={route}
            strokeColor="#000"
            strokeWidth={6}
          />
        )}
        {currentLocation && (
          <Marker
            coordinate={currentLocation}
            title="You are here"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
