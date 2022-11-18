import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import StadiumList from '../components/StadiumList';

const GroundsScreen = ({navigation}) => {
  return (
    <ScrollView>
      <StadiumList
        source={require('../../assets/images/ground1.png')}
        text="Santhekatte Stadium"
        place="Santhekatte"
      />
      <StadiumList
        source={require('../../assets/images/ground2.png')}
        text="Manjunath Stadium"
        place="Udupi"
      />
      <StadiumList
        source={require('../../assets/images/ground3.png')}
        text="Surathkal Sports Academy"
        place="Surathkal"
      />
    </ScrollView>
  );
};

export default GroundsScreen;

const styles = StyleSheet.create({});
