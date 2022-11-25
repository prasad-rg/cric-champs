import {createSlice} from '@reduxjs/toolkit';

const initialValues = {};

export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userData: initialValues,
  },
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
    },
    deletUser: state => {
      state.userData = {};
    },
  },
});
export const {addUser, deletUser} = userSlice.actions;
export default userSlice.reducer;
