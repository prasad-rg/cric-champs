import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import AddProfileDetails from '../components/AddProfileDetails';

const RegisterUserScreen = ({navigation}) => {
  return (
    <AddProfileDetails navigation={navigation}>
      <View style={styles.container}>
        <Text>Hello</Text>
      </View>
    </AddProfileDetails>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterUserScreen;
