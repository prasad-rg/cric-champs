import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TournamentInputList from '../../components/TournamentInputList';
import GradientButton from '../../components/GradientButton';
import { CommonActions } from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  cancelTournament,
  tournamentOverview,
} from '../../services/tournamentManagement';
import { StackActions } from '@react-navigation/native';

const Tournament = ({navigation, disableRegenerateFixture=true}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const [currentOverview, setCurrentOverview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadTournamentOverView = async () => {
    setIsLoading(true);
    const response = await tournamentOverview(tournamentDetails._id);
    setIsLoading(false);
    console.log(response.data.data);
    if (response.status) {
      setCurrentOverview(response.data.data);
    }
  };

  const createTwoButtonAlert = () =>
    Alert.alert('Cancel Tournament', 'Do you want to cancel the tournament ?', [
      {
        text: 'No',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          const res = await cancelTournament(tournamentDetails._id);
          if (res.status) {
            Alert.alert('Tournament Deleted Successsfully');
            navigation.dispatch(CommonActions.reset({
          index:0,
            routes:[
                {
                  name:"HomeStack"
                }
            ]
            }))
          } else {
            Alert.alert('Please Try Again');
          }
        },
        style: 'destructive',
      },
    ]);

  useEffect(() => {
    loadTournamentOverView();
  }, []);

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.mainView}>
          <TournamentInputList
            text="Teams"
            number={currentOverview !== null && currentOverview?.teams}
            onPress={() =>
              navigation.dispatch(StackActions.push('TeamsList'))
            }
          />
          <TournamentInputList
            text="Overs"
            number={currentOverview !== null && currentOverview?.overs}
            onPress={() =>
              navigation.dispatch(StackActions.push('OversScreen'))
            }
          />
          <TournamentInputList
            text="Grounds"
            number={currentOverview !== null && currentOverview?.grounds}
            onPress={() => navigation.dispatch(StackActions.push('Ground'))}
          />
          <TournamentInputList
            text="Umpires"
            number={currentOverview !== null && currentOverview?.umpires}
            onPress={() =>
              navigation.dispatch(StackActions.push('UmpiresList'))
            }
          />
          <TournamentInputList
            text="Start Date"
            number={
              currentOverview !== null && currentOverview?.startDateEnglish
            }
            onPress={() =>
              navigation.dispatch(StackActions.push('DateScreen'))
            }
          />
          <TournamentInputList
            text="End Date"
            number={currentOverview !== null && currentOverview?.endDateEnglish}
            onPress={() =>
              navigation.dispatch(StackActions.push('DateScreen'))
            }
          />
          <TournamentInputList
            text="Start of Play"
            number={
              currentOverview !== null && currentOverview?.startTimeNormalFormat
            }
            onPress={() =>
              navigation.dispatch(StackActions.push('START TIME'))
            }
          />
          <TournamentInputList
            text="End of Play"
            number={
              currentOverview !== null && currentOverview?.endTimeNormalFormat
            }
            onPress={() =>
              navigation.dispatch(StackActions.push('END TIME'))
            }
          />
        <TouchableOpacity
          style={styles.card}
          onPress={() => createTwoButtonAlert()}>
          <Text style={styles.cancelText}>Cancel Tournament</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      {disableRegenerateFixture && (
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
      )}
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
    marginBottom:20,
    justifyContent: 'space-between',
  },
  cancelText: {
    // height: 17,
    // width: 141,
    color: '#F5112D',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15.36,
    padding: 5,
  },
});
