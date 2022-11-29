import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import StadiumList from '../../components/StadiumList';
import TeamListName from '../../components/TeamListName';
import {useIsFocused} from '@react-navigation/native';
import {getInfoByMatchId} from '../../services/viewTournament';

const InfoScreen = ({route}) => {
  const [matchDetails, setMatchDetails] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const loadTeams = async () => {
    setIsLoading(true);
    const response = await getInfoByMatchId(route?.params?.matchId);
    setIsLoading(false);
    console.log('response for Info screen', response.data);
    if (response.status) {
      setMatchDetails(response.data);
    }
  };
  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadTeams();
    }
  }, [focus]);

  return isLoading ? (
    <ActivityIndicator size={'large'} color='rgba(0, 102, 226, 1)' />
  ) : (
    <>
      <View style={styles.container}>
        <View style={styles.cardView}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.teamView1}>
              <Image
                source={{uri: matchDetails?.team1?.logo?.url}}
                style={styles.image}
              />
              <Text style={styles.teamText1}>{matchDetails?.team1?.name}</Text>
            </View>
            <Text style={styles.vsText}>VS</Text>
            <View style={styles.teamView2}>
              <Text style={styles.teamText2}>{matchDetails?.team2?.name}</Text>
              <Image
                source={{uri: matchDetails?.team2?.logo?.url}}
                style={styles.image}
              />
            </View>
          </View>
          <View style={styles.line} />
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={styles.matchText}>
              Match {matchDetails?.result?.matchNumber}
            </Text>
            <Text style={styles.tournamnetText}>
              {route?.params?.tournamentName}
            </Text>
            <Text style={styles.timeText}>
              {matchDetails?.result?.matchDateInEnglish},{' '}
              {matchDetails?.result?.matchStartTimingInNormal}
            </Text>
          </View>
        </View>

        <Text style={styles.headingName}>Stadium</Text>
        <StadiumList
          source={{uri: matchDetails?.ground?.groundPic?.url}}
          text={matchDetails?.ground?.name}
          place={matchDetails?.ground?.city}
        />
        <Text style={styles.headingName}>Umpire</Text>
        <TeamListName
          source={matchDetails?.umpire?.profilePic?.url}
          text={matchDetails?.result?.umpireName}
        />
        <Text style={styles.headingName}>Captains</Text>
        <StadiumList
          source={{uri: matchDetails?.team1?.captainId?.profilePic?.url}}
          text={matchDetails?.team1?.captainId?.name}
          place={matchDetails?.team1?.captainId?.expertise}
        />
        <StadiumList
          source={{uri: matchDetails?.team2?.captainId?.profilePic?.url}}
          text={matchDetails?.team2?.captainId?.name}
          place={matchDetails?.team2?.captainId?.expertise}
        />
      </View>
    </>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    height: 150,
    width: '90%',
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin: 20,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  teamView1: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  teamView2: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  teamText1: {
    width: 80,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    paddingHorizontal: 20,
  },
  teamText2: {
    width: 90,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    paddingHorizontal: 20,
  },
  vsText: {
    height: 16,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    marginVertical: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  line: {
    width: '85%',
    color: '#979797',
    opacity: 0.12,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 10,
  },
  tournamnetText: {
    height: 19,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
  },
  matchText: {
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
  },
  timeText: {
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop: 6,
  },
  headingName: {
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    marginHorizontal: 20,
    marginTop: 10,
  },
});
