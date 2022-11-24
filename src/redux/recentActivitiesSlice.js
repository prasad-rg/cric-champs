import {createSlice} from '@reduxjs/toolkit';

const initialValues = [];

export const recentActivitiesSlice = createSlice({
  name: 'recentActivities',
  initialState: {
    recentActivities: initialValues,
  },
  reducers: {
    storeRecentActivities: (state, action) => {
      let isPresent = false;
      for (let item of state.recentActivities) {
        if (item === action.payload) {
          isPresent = true;
        }
      }
      if (!isPresent) {
        state.recentActivities.unshift(action.payload);
      }
    },
    removeRecentActivities: (state, action) => {
      state.recentActivities = state.recentActivities.filter(
        item => item !== action.payload,
      );
    },
  },
});
export const {storeRecentActivities, removeRecentActivities} = recentActivitiesSlice.actions;
export default recentActivitiesSlice.reducer;
