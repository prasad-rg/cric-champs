import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AddProfileDetails from '../components/AddProfileDetails';
import {TextField} from 'rn-material-ui-textfield';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';
import {useSelector} from 'react-redux';
import {getPlayerDetailsByTeamIdAndTournamentIdAndPlayerId} from '../services/viewTournament';

const PlayerProfile = ({navigation, route}) => {
  const [gender, setGender] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const getDetails = data => {
    setProfilePictureUri(data);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPlayerDetails, setCurrentPlayerDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {tournamentDetails} = useSelector(state => state.tournamentDetails);

  const loadPlayerDetails = async () => {
    setIsLoading(true);
    const response = await getPlayerDetailsByTeamIdAndTournamentIdAndPlayerId(
      route.params.playerId,
      route.params.teamId,
      tournamentDetails._id,
    );
    setIsLoading(false);
    if (response.status) {
      setCurrentPlayerDetails(response.data);
    }
  };

  const Details = [
    {
      id: 1,
      title: 'City / Town',
      value: currentPlayerDetails?.city,
    },
    {
      id: 2,
      title: 'Team',
      value: currentPlayerDetails?.teamId?.name,
    },
    {
      id: 3,
      title: 'Captain',
      value:
        currentPlayerDetails?.designation?.toLowerCase() === 'captain'
          ? 'Yes'
          : 'No',
    },
    {
      id: 4,
      title: 'Role',
      // value: 'batsman / Captain',
      value:
        currentPlayerDetails?.expertise?.toLowerCase() === 'batting'
          ? 'Batsman / '
          : currentPlayerDetails?.expertise?.toLowerCase() === 'bowling'
          ? 'Bowler / '
          : currentPlayerDetails?.expertise?.toLowerCase() === 'all rounder'
          ? 'All Rounder /'
          : 'Player /',
    },
    {
      id: 5,
      title: 'Batting Style',
      value: currentPlayerDetails?.batting,
    },
    {
      id: 6,
      title: 'Bowling Style',
      value:
        currentPlayerDetails?.bowling + ' ' + currentPlayerDetails?.bowlingType,
    },
    {
      id: 7,
      title: 'Matches',
      value: '5',
    },
    {
      id: 8,
      title: 'Runs',
      value: currentPlayerDetails?.runsConceded,
    },
    {
      id: 9,
      title: 'Wickets',
      value: currentPlayerDetails?.wickets,
    },
    {
      id: 10,
      title: 'Achievements',
      value: 'Man of the Match (Match 5)',
    },
  ];

  useEffect(() => {
    loadPlayerDetails();
  }, []);
  return (
    <View style={styles.primaryContainer}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={loadPlayerDetails}
          />
        }>
        <AddProfileDetails
          navigation={navigation}
          title={currentPlayerDetails?.name}
          getImageUri={getDetails}
          profilePictureUri={{
            uri: currentPlayerDetails?.profilePic?.url,
          }}>
           
          </AddProfileDetails>
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

export default PlayerProfile;
