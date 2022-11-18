import {ScrollView, StyleSheet, Text, View,Platform} from 'react-native';
import React from 'react';
import TournamentInputList from '../../components/TournamentInputList';
import GradientButton from '../../components/GradientButton';
const Tournament = ({navigation}) => {
  return (
    <View style={{flex:1}}>
    <ScrollView>
      <View style={styles.mainView}>
        <TournamentInputList text="Teams" number="6" />
        <TournamentInputList text="Overs" number="5" />
        <TournamentInputList text="Grounds" number="4" />
        <TournamentInputList text="Umpires" number="4" />
        <TournamentInputList text="Start Date" number="Sat, Oct 15 2017" />
        <TournamentInputList text="End Date" number="Sun, Oct 16 2017" />
        <TournamentInputList text="Start of Play" number="9:00 AM" />
        <TournamentInputList text="End of Play" number="6:00 PM" />
      </View>
      <View style={styles.card}>
  <Text style={styles.cancelText}>
    Cancel Tournament
  </Text>
      </View>
    </ScrollView>
    <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="RE-GENERATE FIXTURE"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
        />
      </View>

    </View>
  );
};

export default Tournament;

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    flex: 1,
  },
  card: {
    height: 50,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cancelText:{
    height: 17,
  // width: 141,
  color: '#F5112D',
  fontFamily: "Roboto-Medium",
  fontSize: 16,
  fontWeight: '500',
  letterSpacing: 0,
  lineHeight: 15.36,
  padding:5
  }
});
