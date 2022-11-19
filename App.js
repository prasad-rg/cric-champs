import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import AddUmpire from './src/screens/AddUmpire';

// imports
import CreateTournament from './src/screens/CreateTournament';

// tuesday
import ViewScreen from './src/screens/ViewScreen';


import Circle from './src/components/Circle';
import DotBall from './src/components/DotBall';
import AppStack from './src/navigation/AppStack';
import ManageScreen from './src/screens/ManageScreen';
import TournamentInputList from './src/components/TournamentInputList';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';

import store from './src/redux/store';
import Overview from './src/screens/Overview';
import MatchCard from './src/components/MatchCard';
import TeamInfoScreen from './src/screens/TeamInfoScreen';
import MatchDetails from './src/screens/MatchDetails'
import CoAdminCard from './src/components/CoAdminCard'
import CoAdmins from './src/screens/managedetails.js/CoAdmins';
import OnBoardingScreenOne from './src/screens/onboardingscreens/OnBoardingScreenOne'
import OnBoardingScreenTwo from './src/screens/onboardingscreens/OnBoardingScreenTwo'
import OnBoardingScreenThree from './src/screens/onboardingscreens/OnBoardingScreenThree'
import Fixture from './src/screens/Fixture'
import PlayerProfile from './src/screens/PlayerProfile'
import StadiumInformation from './src/screens/StadiumInformation';


let persistor = persistStore(store);

const App = () => {
  // return (
  //   <View
  //     style={{
  //       flex: 1,
  //       justifyContent: 'center',
  //       alignItems: 'center',
  //       backgroundColor: '#9B9B9B',
  //       padding: 15,
  //     }}>

  //   </View>
  // );
  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    //     <AppStack />
    //   </PersistGate>
    // </Provider>
    <StadiumInformation/>
  );
};

export default App;;

const styles = StyleSheet.create({
  text:  {
    fontFamily:  'HelveticaNeue Bold',,
  },,
});
;
