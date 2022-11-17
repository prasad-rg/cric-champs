import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import AuthStack from './src/navigation/AuthStack';
import CreateTournament from './src/screens/CreateTournament';
import UserControl from './src/screens/UserControl';

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
  return <AuthStack />;
  // return <UserControl />;
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'HelveticaNeue Bold',
  },
});
