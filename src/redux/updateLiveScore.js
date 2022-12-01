import {createSlice} from '@reduxjs/toolkit';

const initialValue = [];

export const updateLiveScore = createSlice({
  name: 'liveScoreData',
  initialState: {
    team1Players: initialValue,
    team2Players: initialValue,
    battingTeamId: null,
    bowlingTeamId: null,
    initalPlayerSelected: [],
  },
  reducers: {
    addTeam1Players: (state, action) => {
      state.team1Players = action.payload;
    },
    addTeam2Players: (state, action) => {
      state.team2Players = action.payload;
    },
    addTeamId: (state, action) => {
      state.battingTeamId = action.payload.team1Id;
      state.bowlingTeamId = action.payload.team2Id;
    },
    swapTeamId: (state, action) => {
      let tempId = state.battingTeamId;
      state.battingTeamId = state.bowlingTeamId;
      state.bowlingTeamId = tempId;
    },
    clearAllPlayers: (state, action) => {
      state.team1Players = [];
      state.team2Players = [];
    },
    addInitialPlayerSelected: (state, action) => {
      state.initalPlayerSelected.push(action.payload);
    },
    cleareInitialPlayerSelected: (state, action) => {
      state.initalPlayerSelected = [];
    },
    swapTeamPlayers: (state, action) => {
      let tempPlayers = state.team1Players;
      state.team1Players = state.team2Players;
      state.team2Players = tempPlayers;
    },
  },
});
export const {
  addTeam1Players,
  addTeam2Players,
  addTeamId,
  swapTeamId,
  clearAllPlayers,
  addInitialPlayerSelected,
  cleareInitialPlayerSelected,
  swapTeamPlayers,
} = updateLiveScore.actions;
export default updateLiveScore.reducer;
