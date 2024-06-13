import React from 'react'
import store from './src/store/store';
import { Provider } from 'react-redux';
import MapScreen from './src/screens/MapScreen';


const App = () => {
  return (
    <Provider store={store}>
      <MapScreen/>
    </Provider>
  )
}

export default App


/*import { PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const App = () => {
  const [position, setPosition] = useState(null);
  const [route, setRoute] = useState([]);

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
          setPosition({ latitude, longitude });
          setRoute(route => [...route, { latitude, longitude }]);
        },
        (error) => console.log(error),
        { enableHighAccuracy: true, distanceFilter: 1, interval: 1000 }
      );
    };

    requestLocationPermission();

    return () => {
      Geolocation.clearWatch();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Text>Harita Uygulaması</Text>
      <MapView style={styles.map} initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      showsUserLocation={true}
      >
        {route.length>0 && (
          <Polyline coordinates={route} strokeColor="#000" strokeWidth={6}/>
        )}

        {
          position && (
            <Marker coordinate={position}
            title="You are here"

          />

          )
        }



      

      </MapView>
    </View>
  )
}
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


export default App
*/