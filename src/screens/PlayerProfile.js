import {
  View,
  StyleSheet,
  Text,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

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
  const isView = useSelector(state => state.tournamentdata.isView);

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

  // const data={
  // teamName:inputValues.name,
  // name:value.name,
  // city:inputValues.city,
  // batting:value.batting,
  // bowling:value.bowling,
  // bowlingtype:value.bowlingtype,
  // designation:value.designation,
  // expertise:value.expertise,
  // }

  const Details = [
    {
      id: 1,
      title: 'City / Town',
      value: currentPlayerDetails?.city
        ? currentPlayerDetails?.city
        : route.params.city
        ? route.params.city
        : 'NA',
    },
    {
      id: 2,
      title: 'Team',
      value: currentPlayerDetails?.teamId?.name
        ? currentPlayerDetails?.teamId?.name
        : route.params?.teamName
        ? route.params?.teamName
        : 'NA',
    },
    {
      id: 3,
      title: 'Captain',
      value:
        currentPlayerDetails?.designation?.toLowerCase() === 'captain' ||
        route.params.designation?.toLowerCase() === 'captain'
          ? 'Yes'
          : 'No',
    },
    {
      id: 4,
      title: 'Role',
      // value: 'batsman / Captain',
      value:
        currentPlayerDetails?.expertise?.toLowerCase() === 'batting' ||
        route.params?.expertise?.toLowerCase() === 'batting'
          ? 'Batsman / '
          : currentPlayerDetails?.expertise?.toLowerCase() === 'bowling' ||
            route.params?.expertise?.toLowerCase() === 'bowling'
          ? 'Bowler / '
          : currentPlayerDetails?.expertise?.toLowerCase() === 'all rounder' ||
            route.params?.expertise?.toLowerCase() === 'all rounder'
          ? 'All Rounder /'
          : 'Player /',
    },
    {
      id: 5,
      title: 'Batting Style',
      value: currentPlayerDetails?.batting
        ? currentPlayerDetails?.batting
        : route.params?.batting
        ? route.params?.batting
        : 'NA',
    },
    {
      id: 6,
      title: 'Bowling Style',
      value: currentPlayerDetails?.bowlingType
        ? currentPlayerDetails?.bowlingType
        : route.params.bowlingType
        ? route.params.bowlingType
        : 'NA',
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
  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadPlayerDetails();
    }
  }, [focus]);

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
          playerId={route.params.playerId}
          navigation={navigation}
          isView={isView}
          title={
            currentPlayerDetails?.name
              ? currentPlayerDetails?.name
              : route.params.name
              ? route.params.name
              : ''
          }
          getImageUri={getDetails}
          type="player"
          profilePictureUri={{
            uri: currentPlayerDetails?.profilePic?.url
              ? currentPlayerDetails?.profilePic?.url
              : route.params.image
              ? route.params.image
              : null,
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

export default PlayerProfile;
