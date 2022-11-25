import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import TimePickerPage from '../../components/TimePicker';
const StartTime = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>When do you want start for the day?</Text>
      <TimePickerPage />
    </ScrollView>
  );
};

export default StartTime;
const styles = StyleSheet.create({
  text: {
    height: 16,
    width: 224,
    opacity: 0.5,
    color: '#666666',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 11,
    flex: 1,
    // borderWidth: 1,
  },
});
