import {createSlice} from '@reduxjs/toolkit';

export const updateLiveScoreControls = createSlice({
  name: 'updateLiveScoreControls',
  initialState: {
    updateLiveScoreControls: false,
  },
  reducers: {
    changeUpdatePressedState: (state, action) => {
      state.updateLiveScoreControls = !state.updateLiveScoreControls;
    },
  },
});
export const {changeUpdatePressedState} = updateLiveScoreControls.actions;
export default updateLiveScoreControls.reducer;
