import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
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
    const response = await getTeamsByTournamentId(tournamentDetails._id);
    setIsLoading(false);
    if (response.status) {
      setCurrentTeams(response.data);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TeamInfoScreen', {
          teamId: item._id,
          teamLogo: item.logo.url,
          teamName: item.name,
        })
      }>
      <TeamListName source={item.logo.url} text={item.name} />
    </TouchableOpacity>
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
