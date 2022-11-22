import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import MatchReducer from './MatchSlice';
import viewTournamentReducer from './viewTournamentSlice';
import ParticipantReducer from './ParticipantSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  participantdata: ParticipantReducer,
  auth: authReducer,
  matchdata: MatchReducer,
  tournamentDetails: viewTournamentReducer,
});
const persistRed = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistRed,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
