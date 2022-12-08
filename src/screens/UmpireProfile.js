import {View, StyleSheet, Text, Alert, ScrollView} from 'react-native';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import AddProfileDetails from '../components/AddProfileDetails';
import {useSelector} from 'react-redux';
import {getUmpireDetailsByUmpireIdAndTournamentId} from '../services/viewTournament';
import GradientButton from '../components/GradientButton';
import call from 'react-native-phone-call'
import SimpleToast from 'react-native-simple-toast';

const UmpireProfile = ({navigation, route}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const isView = useSelector(state => state.tournamentdata.isView);

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
      route.params?.umpireId,
      tournamentDetails._id,
    );
    console.log(response)
    setIsLoading(false);
    if (response?.status) {
      setCurrentUmpire(response?.data);
    }
  };
  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadUmpire();
    }
  }, [focus]);

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
          umpireId={route.params.umpireId}
          navigation={navigation}
          title={route.params.umpireName}
          backroundImageUri={require('../../assets/images/umpire.png')}
          getImageUri={getDetails}
          isView={isView}
          isEdit={route.params.isEdit}
          type="umpire"
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
      <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
        {route.params?.isManage ? (
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="CALL UMPIRE"
            style={{height: 48, width: '100%', marginTop: 0}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
            }}
            onPress={() => {
              if(route?.params?.phoneNo){
                const args = {
                  number: route?.params?.phoneNo, // String value with the number to call
                  prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
                  skipCanOpen: true // Skip the canOpenURL check
                }
                
                call(args).catch(console.error)
              }else{
                SimpleToast.show('Umpire Number Not Found')
              }

            }}
          />
        ) : null}
      </View>
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
