import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddProfileDetails from '../components/AddProfileDetails';
import {useSelector} from 'react-redux';
import {getUmpireDetailsByUmpireIdAndTournamentId} from '../services/viewTournament';

const UmpireProfile = ({navigation, route}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const [currentUmpire, setCurrentUmpire] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);
  const getMatchString = matchArray => {
    if (matchArray === undefined) {
      return;
    }
    let matchString = '';
    for (let match of matchArray) {
      matchString += 'Match ' + match.matchNumber + ', ';
    }
    return matchString;
  };
  const loadUmpire = async () => {
    setIsLoading(true);
    const response = await getUmpireDetailsByUmpireIdAndTournamentId(
      route.params.umpireId,
      tournamentDetails._id,
    );
    // console.log(response);
    setIsLoading(false);
    if (response.status) {
      setCurrentUmpire(response.data);
      // console.info(response.data);
    }
    console.log(response);
  };
  useEffect(() => {
    loadUmpire();
  }, []);
  // console.warn(route.params, tournamentDetails._id);
  const Details = [
    {
      id: 1,
      title: 'Name',
      value: currentUmpire !== null && currentUmpire?.name,
    },
    {
      id: 2,
      title: 'City',
      value: currentUmpire !== null && currentUmpire?.city,
    },
    {
      id: 3,
      title: 'Matches',
      value: currentUmpire !== null && getMatchString(currentUmpire?.match),
    },
  ];
  return (
    <View style={styles.primaryContainer}>
      <ScrollView>
        <AddProfileDetails
          navigation={navigation}
          title={route.params.umpireName}
          backroundImageUri={require('../../assets/images/umpire.png')}
          getImageUri={getDetails}
          profilePictureUri={{
            uri: route.params.umpirePicture,
          }}></AddProfileDetails>
        <View>
          {Details.map(item => (
            <View key={item.id} style={styles.listview}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
  },
  primaryContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listview: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    height: 24,

    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
  },
  value: {
    height: 24,
    width: '50%',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 'auto',
  },
});

export default UmpireProfile;
