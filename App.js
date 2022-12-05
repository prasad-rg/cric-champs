import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LogBox} from 'react-native';
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
import {Button, RadioButton} from 'react-native-paper';
import ReadMeExampleSingle from './test';
import DateScreen from './src/screens/DateScreen';
import TimeScreen from './src/screens/TimeScreen';
import RootNavigator from './src/navigation/RootNavigator';
import UpdateLiveScore from './src/screens/UpdateLiveScore';
import OversScreen from './src/screens/OversScreen';
import Overview from './src/screens/Overview';
import ScoreboardScreen from './src/screens/matchdetails/ScoreboardScreen';
import ManageScreen from './src/screens/ManageScreen';
import StatsScreen from './src/screens/StatsScreen';
import ViewScreen from './src/screens/ViewScreen';
import MatchDetails from './src/screens/MatchDetails';
import InfoScreen from './src/screens/matchdetails/InfoScreen';
import ManageTournament from './src/screens/ManageTournament';
import MatchCard from './src/components/MatchCard';
import MatchSlice from './src/redux/MatchSlice';



let persistor = persistStore(store);

const App = () => {
  const [checked, setChecked] = React.useState('first');
  // LogBox.ignoreAllLogs()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootNavigator/>
        {/* <AppStack/> */}
        {/* <TimeScreen /> */}
        {/* <MatchDetails/> */}
        {/* <StatsScreen /> */}
        {/* <MatchCard/> */}
        {/* <MatchDetails/> */}
      </PersistGate>
    </Provider>
    // <ProfileImagePicker/>
    
  );
};

export default App;
