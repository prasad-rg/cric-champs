import {createSlice} from '@reduxjs/toolkit';

export const manageTournamentSlice = createSlice({
  name: 'tournamentdata',
  initialState: {
    isEdit: false,
    editEntity: false,
    teamId: [],
    tournamentdata: {
      code: [],
      tournamentid: [],
      userId: [],
      name: [],
      email: [],
    },
  },

  reducers: {
    setTournamentData: (state, action) => {
      state.tournamentdata.code = action.payload.code;
      state.tournamentdata.tournamentid = action.payload.tournamentid;
      state.tournamentdata.userId = action.payload.userId;
      state.tournamentdata.name = action.payload.name;
      state.tournamentdata.email = action.payload.email;
    },
    setTeamId: (state, action) => {
      state.teamId = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setEditEntity : (state, action) => {
      state.editEntity = action.payload;
    },
  },
});
export const {setTournamentData, setTeamId, setIsEdit,setEditEntity} =
  manageTournamentSlice.actions;
export default manageTournamentSlice.reducer;
