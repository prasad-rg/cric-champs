import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  Share,
} from 'react-native';
import React, {useState} from 'react';
import OutlinedButton from '../components/OutlinedButton';
import GradientButton from '../components/GradientButton';
import {useSelector} from 'react-redux';
import { StackActions } from '@react-navigation/native';

const CreateTournamentSuccess = ({navigation}) => {
  const tournamentdata = useSelector(
    state => state.tournamentdata.tournamentdata,
  );

  const handleBack = () => {
    navigation.navigate('CreateTournament');
  };
  const handleProceed = () => {
    // navigation.navigate('TeamsList');
    navigation.dispatch(
      StackActions.push('TeamsList'),
    );
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${tournamentdata.code}, Share the tournament code to invite your friends`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <TouchableOpacity onPress={handleBack}>
          <Image
            source={require('../../assets/images/back.png')}
            style={styles.backbutton}
          />
        </TouchableOpacity>
        <View style={styles.subContainer}>
          <Image
            source={require('../../assets/images/trophy.png')}
            style={styles.trophy}
          />
          <Text style={styles.tournamentId}>{tournamentdata.code}</Text>
          <Text style={styles.leagueName}>{tournamentdata.name}</Text>
          <Text style={styles.successMessage}>Successfully Created!</Text>
        </View>
        <OutlinedButton
          source={require('../../assets/images/share3.png')}
          text="SHARE"
          style={{marginLeft: 10}}
          buttonstyle={{width: 151, alignSelf: 'center', marginTop: 19.5}}
          onPress={() => onShare()}
        />
      </SafeAreaView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="PROCEED"
          style={{width: '100%', height: 48, marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
          onPress={handleProceed}
        />
      </View>
    </View>
  );
};

export default CreateTournamentSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backbutton: {
    width: 16,
    height: 16,
    marginLeft: 20,
    marginTop: 20,
  },
  subContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  trophy: {
    height: 250,
    width: 265,
    marginTop: 44,
  },
  tournamentId: {
    height: 33,
    color: '#4A90E2',
    fontFamily: 'Roboto-Medium',
    fontSize: 28,
    fontWeight: '500',
    letterSpacing: 0.93,
    lineHeight: 33,
    // text-align: center;
  },
  leagueName: {
    height: 21,
    width: 216,
    color: '#4A4A4A',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 4,
  },
  successMessage: {
    height: 16,
    width: 135,
    color: '#4A4A4A',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 4,
  },
});
