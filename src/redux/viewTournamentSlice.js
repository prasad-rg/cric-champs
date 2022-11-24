import {createSlice} from '@reduxjs/toolkit';

const initialValues = {};

export const viewTournamentSlice = createSlice({
  name: 'tournament',
  initialState: {
    tournamentDetails: initialValues,
  },
  reducers: {
    storeTournamentDetails: (state, action) => {
      state.tournamentDetails = action.payload;
    },
  },
});
export const {storeTournamentDetails} = viewTournamentSlice.actions;
export default viewTournamentSlice.reducer;
