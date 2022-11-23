import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import StadiumList from '../components/StadiumList';
import {useSelector} from 'react-redux';
import {getGroundsByTournamentId} from '../services/viewTournament';

const GroundsScreen = ({navigation}) => {
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [currentGrounds, setCurrentGrounds] = useState([]);

  const loadGrounds = async () => {
    setIsLoading(true);
    const response = await getGroundsByTournamentId(tournamentDetails._id);
    setIsLoading(false);
    if (response.status) {
      setCurrentGrounds(response.result.grounds);
      // console.log(response.result.grounds);
    }
  };

  useEffect(() => {
    loadGrounds();
  }, []);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => navigation.navigate('StadiumInformation')}>
      <StadiumList
        text={item.name}
        source={{uri: item.groundPic.url}}
        place={item.city}
      />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={currentGrounds}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadGrounds} />
      }
    />
    // <ScrollView>
    //   <StadiumList
    //     source={require('../../assets/images/ground1.png')}
    //     text="Santhekatte Stadium"
    //     place="Santhekatte"
    //   />
    //   <StadiumList
    //     source={require('../../assets/images/ground2.png')}
    //     text="Manjunath Stadium"
    //     place="Udupi"
    //   />
    //   <StadiumList
    //     source={require('../../assets/images/ground3.png')}
    //     text="Surathkal Sports Academy"
    //     place="Surathkal"
    //   />
    // </ScrollView>
  );
};

export default GroundsScreen;

const styles = StyleSheet.create({});
