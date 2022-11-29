import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TeamListName from '../../components/TeamListName';
import {getPlayersByTeamIdAndTournamentId} from '../../services/viewTournament';
import {useSelector} from 'react-redux';

const Players = ({navigation, route}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  // console.log(tournamentDetails);

  const loadPlayers = async () => {
    setIsLoading(true);
    const response = await getPlayersByTeamIdAndTournamentId(
      route.params.teamId,
      tournamentDetails._id,
    );
    setIsLoading(false);
    if (response.status) {
      setCurrentPlayers(response.data);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlayerProfile', {
            teamId: route.params.teamId,
            tournamentId: tournamentDetails._id,
            playerId: item._id,
          })
        }>
        <TeamListName source={item.profilePic.url} text={item.name} />
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <View style={{flex: 1}}>
    
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.addButton}>
              <Text style={styles.addTeamText}>ADD PLAYER</Text>
            </View>
          </TouchableOpacity>

        </View>
   
      <View style={styles.mainView}>
        <Text style={styles.players}>Players</Text>
        <FlatList
          data={currentPlayers}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={loadPlayers} />
          }
        />
      </View>
    </View>
  );
};

export default Players;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainView: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  addTeamText: {
    height: 14,
    color: '#4A90E2',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  addButton: {
    height: 40,
    width: 200,
    borderWidth: 2,
    borderRadius: 20,
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
    borderColor: '#4A90E2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  players: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    padding: 17,
  },
});
