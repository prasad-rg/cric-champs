import {createSlice} from '@reduxjs/toolkit';

const initialValues = ' ';

export const matchSlice = createSlice({
  name: 'matchdata',
  initialState: {
    startDate: initialValues,
    endDate : initialValues,
    startTime:initialValues,
    endTime:initialValues,
    start :false,
    end:false,
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
      console.log('Start time', state.startTime)
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload;
      console.log('End time', state.endTime)

    },
    setStart: (state, action) => {
        state.start = action.payload;
    

    },
    setEnd: (state, action) => {
        state.end = action.payload;
     

    },
  },
});
export const {setStartDate,setEndDate,setStart,setEnd,setStartTime,setEndTime} = matchSlice.actions;
export default matchSlice.reducer;
