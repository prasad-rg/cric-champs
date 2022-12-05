import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Platform,
  Dimensions,
  RefreshControl,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GradientButton from '../components/GradientButton';
import {TextField} from 'rn-material-ui-textfield';
import {useSelector} from 'react-redux';
import {Formik} from 'formik';
import * as yup from 'yup';
import ProfileImagePicker from '../components/ProfileImagePicker';
import {createFormData} from '../utils/createFormData';
import {createTeam} from '../services/manageTournament';
import {setTeamId} from '../redux/manageTournamentSlice';
import {useDispatch} from 'react-redux';
import {addParticipant} from '../services/manageTournament';
import {deletePlayers} from '../redux/ParticipantSlice';
import TeamListName from '../components/TeamListName';
import {getPlayersByTeamIdAndTournamentId} from '../services/viewTournament';
import {setIsEdit} from '../redux/manageTournamentSlice';
import {updateTeam} from '../services/manageTournament2';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import {useLayoutEffect} from 'react';

const EditTeam = ({navigation, route}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(profilePictureUri);
  const getDetails = data => {
    console.info(data);
    setProfilePictureUri(data);
  };

  const isEdit = useSelector(state => state.tournamentdata.isEdit);

  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);

  const handlePlayer = () => {
    dispatch(setIsEdit(false));
    navigation.navigate('AddPlayersInEditScreen', {
      teamId: teamId,
    });
  };
  const handleBack = () => {
    dispatch(setIsEdit(false));
    navigation.goBack();
  };

  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const loadPlayers = async () => {
    setIsLoading(true);
    const response = await getPlayersByTeamIdAndTournamentId(
      teamId,
      tournamentId,
    );
    setIsLoading(false);
    if (response.status) {
      setCurrentPlayers(response.data);
    }
  };

  const renderItem = ({item}) => {
    return <TeamListName source={item.profilePic.url} text={item.name} />;
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus == true) {
      loadPlayers();
    }
  }, [focus]);

  const handleEdit = async values => {
    if (profilePictureUri !== '') {
      var formData = createFormData({
        name: values.name,
        city: values.city,
        image: profilePictureUri,
        tournamentId: tournamentId,
        teamId: teamId,
      });
    } else {
      var formData = createFormData({
        name: values.name,
        city: values.city,
        tournamentId: tournamentId,
        teamId: teamId,
      });
    }

    const response = await updateTeam(formData);
    if (response.status) {
      navigation.pop(2);
      dispatch(setIsEdit(false));
    } else {
      Toast.show('Something went wrong, Please try again 😭');
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: isEdit ? route?.params.teamName : '',
          city: '',
        }}>
        {({handleChange, handleBlur, values}) => (
          <>
            <ScrollView>
              <ImageBackground
                style={{width: Dimensions.get('window').width}}
                source={require('../../assets/images/IndiaTeam.png')}
                resizeMode="cover">
                <View style={styles.backgroundBeyondSafeArea}>
                  <SafeAreaView>
                    <View style={styles.profileDetailsContainer}>
                      <View style={styles.header}>
                        <TouchableOpacity
                          style={styles.closeButton}
                          onPress={handleBack}>
                          <Image
                            source={require('../../assets/images/goback.png')}
                            style={styles.gobackbutton}
                          />
                        </TouchableOpacity>
                        <Text style={styles.createTournament}>Edit Team</Text>
                      </View>
                      {profilePictureUri == '' ? (
                        <ProfileImagePicker
                          getImageUri={getDetails}
                          profilePictureUri={{uri: route?.params.teamLogo}}
                        />
                      ) : (
                        <ProfileImagePicker getImageUri={getDetails} />
                      )}

                      <View>
                        <TextField
                          label="Team Name"
                          name="name"
                          onSubmitEditing={this.onSubmit}
                          ref={this.fieldRef}
                          textColor="#FFFFFF"
                          tintColor="rgba(224, 224, 224, 0.7)"
                          baseColor="rgba(224, 224, 224, 0.7)"
                          lineWidth={1}
                          autoCapitalize="none"
                          onChangeText={handleChange('name')}
                          onBlur={handleBlur('name')}
                          value={values.name}
                          activeLineWidth={1}
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 0.57,
                            lineHeight: 19,
                          }}
                          inputContainerStyle={{
                            alignSelf: 'center',
                            height: 61,
                            marginTop: -6,
                            marginHorizontal: 30,
                          }}
                          defaultValue={isEdit ? route?.params?.teamName : ''}
                        />

                        <TextField
                          label="City / Town (Optional)"
                          formatText={this.formatText}
                          onSubmitEditing={this.onSubmit}
                          ref={this.fieldRef}
                          textColor="#FFFFFF"
                          tintColor="rgba(224, 224, 224, 0.7)"
                          baseColor="rgba(224, 224, 224, 0.7)"
                          lineWidth={1}
                          onChangeText={handleChange('city')}
                          onBlur={handleBlur('city')}
                          value={values.city}
                          autoCapitalize="none"
                          activeLineWidth={1}
                          inputContainerStyle={{
                            alignSelf: 'center',
                            height: 61,
                            marginTop: -6,
                            marginHorizontal: 30,
                          }}
                          style={{
                            fontFamily: 'Roboto-Medium',
                            fontSize: 16,
                            fontWeight: 'bold',
                            letterSpacing: 0.57,
                            lineHeight: 19,
                          }}
                          defaultValue={isEdit ? route.params?.teamName : ''}
                        />
                      </View>
                    </View>
                  </SafeAreaView>
                </View>
              </ImageBackground>
              <View style={styles.tournamentTypeView}>
                <TouchableOpacity onPress={handlePlayer}>
                  <View style={styles.addButton}>
                    <Text style={styles.addTeamText}>ADD PLAYER</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.showaddedplayer}>
                <Text style={styles.players}>Players</Text>

                <View>
                  <FlatList
                    data={currentPlayers}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    refreshControl={
                      <RefreshControl
                        refreshing={isLoading}
                        onRefresh={loadPlayers}
                      />
                    }
                  />
                </View>
              </View>
            </ScrollView>
            {isLoading ? (
              <View style={{marginBottom: 20}}>
                <ActivityIndicator size="large" color="#FFBA8C" />
              </View>
            ) : (
              <View style={styles.gradientButton}>
                <GradientButton
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={['#FFBA8C', '#FE5C6A']}
                  text="UPDATE TEAM"
                  style={{width: '100%', marginTop: 0, height: 48}}
                  textstyle={{
                    height: 16,
                    fontWeight: '500',
                    fontSize: 14,
                    letterSpacing: 0.5,
                    lineHeight: 19,
                  }}
                  onPress={() => handleEdit(values)}
                />
              </View>
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  profileDetailsContainer: {
    height: 351,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  gobackbutton: {
    height: 20,
    width: 20,
  },
  createTournament: {
    marginLeft: 32,
    height: 28,
    width: 174,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
  },
  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.9)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  teamlogo: {
    height: 106,
    width: 106,
    borderRadius: 60,
  },
  teamlogoview: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 31,
    borderWidth: 7,
    borderRadius: 60,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 60,
  },
  tournamentTypeView: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  tournamentTypeText: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginBottom: 21,
  },
  gradientButton: {
    alignItems: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  textInput: {
    borderWidth: 1,
  },
  addTeamText: {
    height: 14,
    color: '#0066E2',
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
    borderColor: '#0066E2',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  showaddedplayer: {
    // height: '100%',
    // backgroundColor: 'rgba(217,226,233,0.5)',
  },
  players: {
    height: 16,
    color: '#8E9BA8',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: 16,
    marginTop: 20,
  },
  noplayers: {
    height: 24,
    width: 200,
    color: '#A3A3A3',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginTop: 18,
    textAlign: 'center',
  },
  noplayerView: {
    alignItems: 'center',
    // borderWidth:1
  },
  imagepicker: {
    height: 34,
    width: 34,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 2 8 0 rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    position: 'absolute',
    top: '49%',
    right: '35%',
    elevation: 20,
    shadowColor: '#52006A',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default EditTeam;
