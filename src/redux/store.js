import ParticipantReducer from './ParticipantSlice';
import GroundReducer from './GroundSlice';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './authSlice';
import MatchReducer from './MatchSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const reducer = combineReducers({
  participantdata: ParticipantReducer,
  grounddata: GroundReducer,
  auth: authReducer,
  matchdata: MatchReducer,
});
const persistRed = persistReducer(persistConfig, reducer);

export default configureStore({
  reducer: persistRed,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
