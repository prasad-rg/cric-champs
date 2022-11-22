import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import TeamListName from '../components/TeamListName';
import {useSelector} from 'react-redux';
import {getUmpiresByTournamentId} from '../services/viewTournament';

const UmpiresScreen = () => {
  const [currentUmpires, setCurrentUmpires] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const loadUmpires = async () => {
    setIsLoading(true);
    const response = await getUmpiresByTournamentId(tournamentDetails._id);
    setIsLoading(false);
    if (response.status) {
      setCurrentUmpires(response.data);
    }
  };
  useEffect(() => {
    loadUmpires();
  }, []);

  const renderItem = ({item}) => (
    <TeamListName source={{uri: item.profilePic.url}} text={item.name} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currentUmpires}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadUmpires} />
        }
      />
    </View>

    // <ScrollView>
    //   <TeamListName
    //     source={require('../../assets/images/profile1.png')}
    //     text="Jeevan Lazarus"
    //   />
    //   <TeamListName
    //     source={require('../../assets/images/profile2.png')}
    //     text="Rajesh G"
    //   />
    //   <TeamListName
    //     source={require('../../assets/images/profile3.png')}
    //     text="Sunder Mohan"
    //   />
    //   <TeamListName
    //     source={require('../../assets/images/profile4.png')}
    //     text="Parra Warriors"
    //   />
    //   <TeamListName
    //     source={require('../../assets/images/profile5.png')}
    //     text="Jackson V"
    //   />
    // </ScrollView>
  );
};

export default UmpiresScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
