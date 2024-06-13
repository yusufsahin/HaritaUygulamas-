import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  route: [],
  currentLocation: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    updateLocation: (state, action) => {
      state.currentLocation = action.payload;
      state.route.push(action.payload);
    },
  },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
