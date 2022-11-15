import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import AppBar from '../components/AppBar';

const ForgotPasswordScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <AppBar navigation={navigation} />
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/images/sendEmail.png')}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 147,
    height: 147,
  },
});

export default ForgotPasswordScreen;
