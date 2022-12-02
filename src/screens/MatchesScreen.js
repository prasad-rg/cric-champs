import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MatchCard from '../components/MatchCard';
import {useSelector} from 'react-redux';
import {getMatchesByTournamentId} from '../services/viewTournament';
import {convertMatchesDataWithScores} from '../utils/convertMatchesDataWithScores';

const MatchesScreen = ({navigation}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  console.log("touurrrrrr",tournamentDetails)
  const [currentMatches, setCurrentMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let prevDate = null;
  const loadMatches = async () => {
    setIsLoading(true);
    const response = await getMatchesByTournamentId(tournamentDetails._id);
    setIsLoading(false);
    if (response.status) {
      setCurrentMatches(() => convertMatchesDataWithScores(response.data));
      console.warn(convertMatchesDataWithScores(response.data));
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const renderItem = ({item}) => {
    let currentDate = item.matchDateInEnglish;
    if (currentDate === prevDate) {
      prevDate = currentDate;
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MatchDetails', {
              team1Id: item.team1Id,
              team2Id: item.team2Id,
              matchId: item._id,
              matchNumber: item.matchNumber,
              teams: {team1Name: item.team1Name, team2Name: item.team2Name},
              tournamentName:tournamentDetails.name,
            })
          }>
          <MatchCard matchDetails={item} />
        </TouchableOpacity>
      );
    } else {
      prevDate = currentDate;
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MatchDetails', {
              team1Id: item.team1Id,
              team2Id: item.team2Id,
              matchId: item._id,
              matchNumber: item.matchNumber,
              teams: {team1Name: item.team1Name, team2Name: item.team2Name},
              tournamentName:tournamentDetails.name,
            })
          }>
          <Text style={styles.dayText}>{item.matchDateInEnglish}</Text>
          <MatchCard matchDetails={item} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={currentMatches}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadMatches} />
          }
        />
      )}
    </View>
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
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
