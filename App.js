import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import OnBoardingStack from './src/navigation/OnBoardingStack';
import CreateTournament from './src/screens/CreateTournament';
import AppStack from './src/navigation/AppStack';
import AddTeam from './src/screens/AddTeam';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import ProfileImagePicker from './src/components/ProfileImagePicker';

let persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppStack />
      </PersistGate>
    </Provider>
    // <ProfileImagePicker/>
  );
};

export default App;
