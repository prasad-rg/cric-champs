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
    deletePlayers:  (state, action) => {
      console.log('before deleting',state.value)
      state.value =[]
      console.log('after deleting',state.value)

    }
  },
});
export const {addTeam,deletePlayers} = participantSlice.actions;
export default participantSlice.reducer;
