import {createSlice} from '@reduxjs/toolkit';
import {View, Text} from 'react-native';
import React from 'react';

const initialValues = [];

export const participantSlice = createSlice({
  name: 'participantdata',
  initialState: {
    value: initialValues,
  },
  reducers: {
    addTeam: (state, action) => {

      },
  },
});
export const {addTeam} = participantSlice.actions;
export default participantSlice.reducer;
