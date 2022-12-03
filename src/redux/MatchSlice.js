import {createSlice} from '@reduxjs/toolkit';

const initialValues = ' ';

export const matchSlice = createSlice({
  name: 'matchdata',
  initialState: {
    startDate: initialValues,
    endDate: initialValues,
    startTime: initialValues,
    endTime: initialValues,
    start: false,
    end: false,
  },
  reducers: {
    setStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setStartTime: (state, action) => {
      state.startTime = action.payload;
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setEnd: (state, action) => {
      state.end = action.payload;
    },
    deleteStartDate: (state, action) => {
      state.startDate = [];
    },
    deleteEndDate: (state, action) => {
      state.endDate = [];
    },
    deleteStartTime: (state, action) => {
      state.startTime = [];
    },
    deleteEndTime: (state, action) => {
      state.endTime = [];
    },

  },
});
export const {
  setStartDate,
  setEndDate,
  setStart,
  setEnd,
  setStartTime,
  setEndTime,
  deleteStartDate,
  deleteEndDate,
  deleteStartTime,
  deleteEndTime,
} = matchSlice.actions;
export default matchSlice.reducer;
