import {createSlice} from '@reduxjs/toolkit';

const initialValues = [];

export const umpireSlice = createSlice({
  name: 'umpiredata',
  initialState: {
    value: initialValues,
  },
  reducers: {
    addUmpire: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const {addUmpire} = umpireSlice.actions;
export default umpireSlice.reducer;
