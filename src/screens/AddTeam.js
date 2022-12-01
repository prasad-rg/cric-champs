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
  Alert,
  RefreshControl,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GradientButton from '../components/GradientButton';
import {TextField} from 'rn-material-ui-textfield';
import PlayersList from '../components/PlayersList';
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
import {logout} from '../redux/authSlice';
import {updateTeam} from '../services/manageTournament2';
import {StackActions} from '@react-navigation/native';
// import { ScrollView } from 'react-native-virtualized-view';

const AddTeam = ({navigation, route}) => {
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

  const participantdata = useSelector(state => state.participantdata.value);

  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);

  // console.log("TeamId",teamId,tournamentId)
  const handlePlayer = () => {
    navigation.navigate('AddPlayer');
  };
  const handleBack = () => {
    dispatch(setIsEdit(false));
    navigation.goBack();
  };

  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const handlePlayerList = (value, inputValues) => {
    navigation.navigate('PlayerProfile', {
      image: value.image.path,
      teamName: inputValues.name,
      name: value.name,
      city: inputValues.city,
      batting: value.batting,
      bowling: value.bowling,
      bowlingtype: value.bowlingtype,
      designation: value.designation,
      expertise: value.expertise,
    });
  };

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
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PlayerProfile', {
            teamId: route.params.teamId,
            tournamentId: tournamentId,
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

  const handleEdit = async values => {
    // console.log(values);
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
    console.log('Response after Team Update', response.data.logo);
    if (response.status) {
      navigation.pop(2);
      dispatch(setIsEdit(false));
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: isEdit ? route?.params.teamName : '',
          city: '',
        }}
        onSubmit={async values => {
          if (profilePictureUri !== '') {
            const formData = createFormData({
              ...values,
              image: profilePictureUri,
              tournamentId: tournamentId,
            });
            setIsLoading(true);
            const response = await createTeam(formData);

            if (response.status) {
              dispatch(setTeamId(response.data._id));

              var result = await Promise.all(
                participantdata.map(async el => {
                  var object = Object.assign({}, el);
                  object.name = el.name;
                  object.city = el.city;
                  object.phoneNo = el.phoneNo;
                  object.batting = el.batting;
                  object.bowling = el.bowling;
                  object.bowlingtype = el.bowlingtype;
                  object.designation = el.designation;
                  object.expertise = el.expertise;
                  object.image = el.image;
                  object.tournamentId = tournamentId;
                  object.teamId = response.data._id;
                  object.role = 'player';

                  Object.keys(object).forEach(key => {
                    if (object[key] === '') {
                      delete object[key];
                    }
                  });

                  // console.log(object);
                  const participantFormData = createFormData(object);
                  const createparticipantresponse = await addParticipant(
                    participantFormData,
                  );
                  return createparticipantresponse;
                }),
              );

              const status = result.map(stat => {
                // console.log(stat);
              });
              if (status) {
                setIsLoading(false);
                navigation.goBack();
                dispatch(deletePlayers());
              } else {
                Alert.alert('Something went wrong. Please try again');
              }
            } else {
              console.log('Please refresh the token');
            }
          } else {
            console.log('Please Add profile picture');
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
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
                        <Text style={styles.createTournament}>
                          {isEdit ? 'Edit Team' : 'Add Team'}
                        </Text>
                      </View>
                      {isEdit && profilePictureUri == '' ? (
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
                          // formatText={this.formatText}
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
                          // isDefaultVisible()
                          // defaultValue={'HELLO'}
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

                {isEdit ? (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('PlayerProfile', {
                        teamId: teamId,
                        tournamentId: tournamentId,
                        playerId: item._id,
                      })
                    }>
                    {/* <TeamListName source={item.profilePic.url} text={item.name} /> */}

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
                  </TouchableOpacity>
                ) : (
                  // <Players/>
                  <>
                    {participantdata.length === 0 ? (
                      <View style={styles.noplayerView}>
                        <Text style={styles.noplayers}>
                          No Players Added Yet!
                        </Text>
                      </View>
                    ) : (
                      <View style={styles.teamsView}>
                        {participantdata.map(value => (
                          // console.log(value.image.path)
                          <View key={value.tempId}>
                            <TouchableOpacity
                              onPress={() => handlePlayerList(value, values)}>
                              <PlayersList
                                source={value.image.path}
                                name={value.name}
                                designation={value.designation}
                                expertise={value.expertise}
                                batting={value.batting}
                                bowling={value.bowling}
                                bowlingtype={value.bowlingtype}
                              />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </>
                )}
              </View>
            </ScrollView>
            {isLoading ? (
              <View style={{marginBottom: 20}}>
                <ActivityIndicator size="large" color="#FFBA8C" />
              </View>
            ) : (
              <View style={styles.gradientButton}>
                {isEdit ? (
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
                ) : (
                  <GradientButton
                    start={{x: 0, y: 0}}
                    end={{x: 2, y: 0}}
                    colors={
                      participantdata.length === 0
                        ? ['#999999', '#999999']
                        : ['#FFBA8C', '#FE5C6A']
                    }
                    text="SAVE TEAM"
                    style={{width: '100%', marginTop: 0, height: 48}}
                    textstyle={{
                      height: 16,
                      fontWeight: '500',
                      fontSize: 14,
                      letterSpacing: 0.5,
                      lineHeight: 19,
                    }}
                    onPress={handleSubmit}
                  />
                )}
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

export default AddTeam;
