import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MatchCard from '../components/MatchCard';

const MatchesScreen = ({navigation}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.dayText}>SATURDAY-OCTOBER 17,2017</Text>
 
          <MatchCard text="ABONDONED" />
          <MatchCard text="PAST"/>
          <Text style={styles.dayText}>SATURDAY-OCTOBER 18,2017</Text>
          <MatchCard text="LIVE" />
          <MatchCard text="UPCOMING"/>

      </View>
    </ScrollView>
  );
};

export default MatchesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dayText: {
    height: 19,
    width: 248,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    padding: 20,
  },
});
