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
import {Button, RadioButton} from 'react-native-paper';
import ReadMeExampleSingle from './test';

let persistor = persistStore(store);

const App = () => {
  const [checked, setChecked] = React.useState('first');
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <AppStack /> */}
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <ReadMeExampleSingle />
        </View>
        {/* <Text>Hello</Text> */}
      </PersistGate>
    </Provider>
    // <ProfileImagePicker/>
  );
};

export default App;
