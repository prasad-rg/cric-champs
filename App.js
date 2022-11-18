import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import AuthStack from './src/navigation/AuthStack';
import CreateTournament from './src/screens/CreateTournament';
import UserControl from './src/screens/UserControl';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import OnBoardingStack from './src/navigation/OnBoardingStack';
import RootNavigator from './src/navigation/RootNavigator';

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
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <AuthStack /> */}
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
  // return <UserControl />;
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HelveticaNeue Bold',
  },
});
