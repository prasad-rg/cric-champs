import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import TeamListName from '../components/TeamListName';
import {useState} from 'react';
import {getTeamsByTournamentId} from '../services/viewTournament';
import {useSelector} from 'react-redux';
import {useEffect} from 'react';
const TeamsScreen = ({navigation}) => {
  const [currentTeams, setCurrentTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);

  const loadTeams = async () => {
    setIsLoading(true);
    const response = await getTeamsByTournamentId('6377740a0e7585a1b37428a1');
    setIsLoading(false);
    if (response.status) {
      setCurrentTeams(response.data);
    }
  };

  const renderItem = ({item}) => (
    <TeamListName source={{uri: item.logo.url}} text={item.name} />
  );

  useEffect(() => {
    loadTeams();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={currentTeams}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadTeams} />
        }
      />
    </View>
  );
};

export default TeamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
