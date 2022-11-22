import {createSlice} from '@reduxjs/toolkit';

const initialValues = ' ';

export const matchSlice = createSlice({
  name: 'matchdata',
  initialState: {
    startDate: initialValues,
    endDate : initialValues,
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
    setStart: (state, action) => {
        state.start = action.payload;
    },
    setEnd: (state, action) => {
        state.end = action.payload;
    },
  },
});
export const {setStartDate,setEndDate,setStart,setEnd} = matchSlice.actions;
export default matchSlice.reducer;
