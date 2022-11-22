import {createSlice} from '@reduxjs/toolkit';

const initialValues = [];

export const participantSlice = createSlice({
  name: 'participantdata',
  initialState: {
    value: initialValues,
  },
  reducers: {
    addTeam: (state, action) => {
        state.value.push(action.payload);
      },
  },
});
export const {addTeam} = participantSlice.actions;
export default participantSlice.reducer;
