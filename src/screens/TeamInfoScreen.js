import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileImagePicker from '../components/ProfileImagePicker';
import TeamInfoTab from '../navigation/TeamInfoTab';
import {setIsEdit} from '../redux/manageTournamentSlice';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/native';
import {useIsFocused} from '@react-navigation/native';
import {deleteTeam} from '../services/manageTournament2';
import Toast from 'react-native-simple-toast';

const TeamInfoScreen = ({navigation, route}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const dispatch = useDispatch();
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);
  const isView = useSelector(state => state.tournamentdata.isView);
   
  const getDetails = data => {
    setProfilePictureUri(data);
  };

  const handleEdit = () => {
    dispatch(setIsEdit(true));
    navigation.dispatch(
      StackActions.push('EditTeam', {
        title: 'Edit Team',
        teamLogo: route?.params.teamLogo,
        teamName: route?.params.teamName,
      }),
    );
  };

  const deletPlayers = async () => {
    const data = {
      tournamentId: tournamentId,
      teamId: teamId,
    };
    const response = await deleteTeam(data);
    // console.log(response);
    if (response.status) {
      navigation.pop(1);
    }else{
      Toast.show("Something went wrong, Please try again 😭")
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to remove this team?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deletPlayers();
          },
        },

        {
          text: 'No',
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/IndiaTeam.png')}
        resizeMode="cover">
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.headerText}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setIsEdit(false));
                      navigation.goBack();
                    }}>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.viewText}>
                    {route.params?.teamName
                      ? `${route.params?.teamName}`
                      : 'UDL Strikers'}
                  </Text>
                </View>
                {isView ? (
                  <View></View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity onPress={handleEdit}>
                      <Image
                        source={require('../../assets/images/pencil.png')}
                        style={{
                          tintColor: '#FFFFFF',
                          height: 25,
                          width: 25,
                          marginRight: 23,
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleDelete}>
                      <Image
                        source={require('../../assets/images/trash.png')}
                        style={{
                          tintColor: '#FFFFFF',
                          height: 25,
                          width: 25,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              {/* <View style={styles.teamlogoview}>
                <Image
                  source={require('../../assets/images/team3.png')}
                  style={styles.teamlogo}
                />
              </View> */}
              <ProfileImagePicker
                getImageUri={getDetails}
                profilePictureUri={{uri: route.params.teamLogo}}
                isView={isView}
              />
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>

      {/* <ScrollView contentContainerStyle={{flex: 1}}>
        <TeamInfoTab />
      </ScrollView> */}
      <View style={{flex: 1}}>
        <TeamInfoTab navigation={navigation} route={route} />
      </View>
    </View>
  );
};

export default TeamInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 200,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  viewText: {
    height: 24,
    // width: 100,
    color: 'rgba(255,255,255,1)',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth:1,
    justifyContent: 'space-between',
  },
  heading: {
    height: 28,
    width: 144,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    textAlign: 'center',
    margin: 24,
    alignSelf: 'center',
  },
  tourText: {
    height: 14,
    // width: 143,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
  },
  tourButton: {
    height: 30,
    width: 180,
    borderRadius: 100,
    backgroundColor: '#5DA0D9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -10,
  },
  teamlogo: {
    height: 104,
    width: 104,
    borderRadius: 52,
  },
  teamlogoview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 35,
    borderWidth: 7,
    borderRadius: 60,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 60,
    // shadowOpacity: 0.9,
  },
});
