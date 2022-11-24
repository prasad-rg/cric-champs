import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import TournamentInputList from '../../components/TournamentInputList';
import GradientButton from '../../components/GradientButton';
import {useSelector} from 'react-redux';
import {tournamentOverview} from '../../services/tournamentManagement';

const Tournament = ({navigation}) => {
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
              navigation.navigate('AppStack', {screen: 'TeamsList'})
            }
          />
          <TournamentInputList
            text="Overs"
            number={currentOverview !== null && currentOverview?.overs}
          />
          <TournamentInputList
            text="Grounds"
            number={currentOverview !== null && currentOverview?.grounds}
          />
          <TournamentInputList
            text="Umpires"
            number={currentOverview !== null && currentOverview?.umpires}
          />
          <TournamentInputList
            text="Start Date"
            number={
              currentOverview !== null && currentOverview?.startDateEnglish
            }
          />
          <TournamentInputList
            text="End Date"
            number={currentOverview !== null && currentOverview?.endDateEnglish}
          />
          <TournamentInputList
            text="Start of Play"
            number={
              currentOverview !== null && currentOverview?.startTimeNormalFormat
            }
          />
          <TournamentInputList
            text="End of Play"
            number={
              currentOverview !== null && currentOverview?.endTimeNormalFormat
            }
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.cancelText}>Cancel Tournament</Text>
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
  cancelText: {
    height: 17,
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
