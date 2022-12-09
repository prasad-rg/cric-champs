import {StyleSheet, View, Platform, Text} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';
import RadioButton from '../components/RadioButton';
import ToggleSwitch from '../components/ToggleSwitch';
import RadioButtonDisabled from '../components/RadioButtonDisabled';
import {useDispatch, useSelector} from 'react-redux';
import uuid from 'react-native-uuid';
import {addTeam} from '../redux/ParticipantSlice';
import {Formik} from 'formik';
import * as yup from 'yup';
import {Alert} from 'react-native';
import {createFormData} from '../utils/createFormData';
import {updatePlayer} from '../services/manageTournament2';
import {setEditEntity} from '../redux/manageTournamentSlice';
import Toast from 'react-native-simple-toast';

const AddPlayer = ({navigation, route}) => {
  const [designation, setDesignation] = useState('');
  const [expertise, setExpertise] = useState('');
  const [batting, setBatting] = useState('');
  const [bowling, setBowling] = useState('');
  const [bowlingtype, setBowlingType] = useState('');
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const editEntity = useSelector(state => state.tournamentdata.editEntity);
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);

  const [whiteList, setWhiteList] = useState({
    designation: {isVisble: false},
    expertise: {isVisble: false},
    batting: {isVisble: false},
    bowling: {isVisble: false},
    bowlingtype: {isVisble: false},
  });

  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const enableDesignation = (data, id) => {
    setWhiteList(prev => ({...prev, designation: {isVisble: data}}));
  };
  const enableExpertise = (data, id) => {
    setWhiteList(prev => ({...prev, expertise: {isVisble: data}}));
  };
  const enableBatting = (data, id) => {
    setWhiteList(prev => ({...prev, batting: {isVisble: data}}));
  };
  const enableBowling = (data, id) => {
    setWhiteList(prev => ({...prev, bowling: {isVisble: data}}));
  };
  const enableBowlingType = (data, id) => {
    setWhiteList(prev => ({...prev, bowlingtype: {isVisble: data}}));
  };

  const getDesignation = data => {
    setDesignation(data);
  };
  const getExpertise = data => {
    setExpertise(data);
  };
  const getBatting = data => {
    setBatting(data);
  };
  const getBowling = data => {
    setBowling(data);
  };
  const getBowlingType = data => {
    setBowlingType(data);
  };

  const Designation = [
    {label: 'Captain', value: 'Captain', id: 0},
    {label: 'Vice Captain', value: 'Vice Captain', id: 1},
  ];

  const Expertise = [
    {label: 'Batting', value: 'Batting', id: 0},
    {label: 'Bowling', value: 'Bowling', id: 1},
    {label: 'All Rounder', value: 'All Rounder', id: 2},
    {label: 'Wicket Keeper', value: 'Wicket Keeper', id: 3},
  ];

  const Batting = [
    {label: 'Right Handed', value: 'Right Handed', id: 0},
    {label: 'Left Handed', value: 'Left Handed', id: 1},
  ];

  const Bowling = [
    {label: 'Right Handed', value: 'Right Handed', id: 0},
    {label: 'Left Handed', value: 'Left Handed', id: 1},
  ];
  const BowlingType = [
    {label: 'Fast', value: 'Fast', id: 0},
    {label: 'Slow', value: 'Slow', id: 1},
  ];

  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const handleEdit = async values => {
    // const response = await updatePlayer();
    if (profilePictureUri !== '') {
      var formData = createFormData({
        ...values,
        playerId: route.params.playerId,
        teamId: teamId,
        tournamentId: tournamentId,
        designation: designation,
        expertise: expertise,
        batting: batting,
        bowling: bowling,
        bowlingtype: bowlingtype,
        image: profilePictureUri,
      });
    } else {
      var formData = createFormData({
        ...values,
        playerId: route.params.playerId,
        teamId: teamId,
        tournamentId: tournamentId,
        designation: designation,
        expertise: expertise,
        batting: batting,
        bowling: bowling,
        bowlingtype: bowlingtype,
      });
    }
    const response = await updatePlayer(formData);
    // console.log('Response after Player Update', response.status);
    if (response.status) {
      navigation.pop(2);
      dispatch(setIsEdit(false));
      dispatch(setEditEntity(false));
    }else{
      Toast.show("Something went wrong, Please try again  ")
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: editEntity ? route.params?.playerName : '',
          city: '',
          phoneNo: '',
        }}
        onSubmit={values => {
          setName(values.name);
          if (profilePictureUri !== '') {
            let data = {
              ...values,
              tempId: uuid.v4(),
              designation: designation,
              expertise: expertise,
              batting: batting,
              bowling: bowling,
              bowlingtype: bowlingtype,
              image: profilePictureUri,
            };
            dispatch(addTeam(data));
            navigation.pop();
          } else {
            Toast.show('Please Add profile picture');
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <KeyboardAwareScrollView>
              {editEntity && profilePictureUri === '' ? (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/dhoni.jpeg')}
                  title={editEntity ? 'Update Player' : 'Add Player'}
                  navigation={navigation}
                  getImageUri={getDetails}
                  profilePictureUri={route.params?.playerLogo}
                  type='addplayer'
                />
              ) : (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/dhoni.jpeg')}
                  title={editEntity ? 'Update Player' : 'Add Player'}
                  navigation={navigation}
                  getImageUri={getDetails}
                />
              )}
              <View style={styles.form}>
                <TextField
                  label="Player Name"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(0, 0, 0, 0.4)"
                  baseColor="rrgba(0, 0, 0, 0.4)"
                  lineWidth={1}
                  autoCapitalize="none"
                  inputContainerStyle={{}}
                  activeLineWidth={1}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.57,
                    lineHeight: 19,
                  }}
                  defaultValue={editEntity ? route.params?.playerName : ''}
                />
                <TextField
                  label="City / Town (Optional)"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(0, 0, 0, 0.4)"
                  baseColor="rgba(0, 0, 0, .38)"
                  lineWidth={1}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                  autoCapitalize="none"
                  activeLineWidth={1}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.57,
                    lineHeight: 19,
                  }}
                />
                <TextField
                  label="Phone No, (Optional)"
                  keyboardType="number-pad"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(0, 0, 0, 0.4)"
                  lineWidth={1}
                  autoCapitalize="none"
                  activeLineWidth={1}
                  onChangeText={handleChange('phoneNo')}
                  onBlur={handleBlur('phoneNo')}
                  value={values.phoneNo}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.57,
                    lineHeight: 19,
                  }}
                />
              </View>

              <View
                style={{
                  height: 84,
                  width: 241,
                  marginLeft: 50,
                  marginTop: 31,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.designation}>{`Designation :`}</Text>
                  <ToggleSwitch id={1} onPress={enableDesignation} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 24}}>
                  {whiteList.designation.isVisble ? (
                    <RadioButton
                      radio_props={Designation}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                      onPress={getDesignation}
                    />
                  ) : (
                    <RadioButtonDisabled
                      radio_props={Designation}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: 'rgba(224, 224, 224, 1)',
                  marginTop: 16,
                }}
              />
              <View
                style={{
                  height: 139,
                  width: 300,
                  marginLeft: 50,
                  marginTop: 31,
                  flexWrap: 'wrap',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.designation}>{`Expertise :`}</Text>
                  <ToggleSwitch id={2} onPress={enableExpertise} />
                </View>
                <View
                  style={{
                    width: 300,
                    height: 119,
                    paddingTop: 9,
                  }}>
                  {whiteList.expertise.isVisble ? (
                    <RadioButton
                      radio_props={Expertise}
                      formHorizontal={true}
                      flexWrap={{flexWrap: 'wrap'}}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                        marginTop: 15,
                      }}
                      onPress={getExpertise}
                    />
                  ) : (
                    <RadioButtonDisabled
                      radio_props={Expertise}
                      formHorizontal={true}
                      flexWrap={{flexWrap: 'wrap'}}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                        marginTop: 15,
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: 'rgba(224, 224, 224, 1)',
                  marginTop: 16,
                }}
              />
              <View
                style={{
                  height: 84,
                  width: 241,
                  marginLeft: 50,
                  marginTop: 31,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.designation}>{`Batting :`}</Text>
                  <ToggleSwitch id={3} onPress={enableBatting} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 24}}>
                  {whiteList.batting.isVisble ? (
                    <RadioButton
                      radio_props={Batting}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                      onPress={getBatting}
                    />
                  ) : (
                    <RadioButtonDisabled
                      radio_props={Batting}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: 'rgba(224, 224, 224, 1)',
                  marginTop: 16,
                }}
              />
              <View
                style={{
                  height: 84,
                  width: 241,
                  marginLeft: 50,
                  marginTop: 31,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.designation}>{`Bowling :`}</Text>
                  <ToggleSwitch id={4} onPress={enableBowling} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 24}}>
                  {whiteList.bowling.isVisble ? (
                    <RadioButton
                      radio_props={Bowling}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                      onPress={getBowling}
                    />
                  ) : (
                    <RadioButtonDisabled
                      radio_props={Bowling}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: 'rgba(224, 224, 224, 1)',
                  marginTop: 16,
                }}
              />
              <View
                style={{
                  height: 84,
                  width: 241,
                  marginLeft: 50,
                  marginTop: 31,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.designation}>{`Bowling Type :`}</Text>
                  <ToggleSwitch onPress={enableBowlingType} id={5} />
                </View>
                <View style={{flexDirection: 'row', paddingTop: 24}}>
                  {whiteList.bowlingtype.isVisble ? (
                    <RadioButton
                      radio_props={BowlingType}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                      onPress={getBowlingType}
                    />
                  ) : (
                    <RadioButtonDisabled
                      radio_props={BowlingType}
                      formHorizontal={true}
                      style={{
                        marginBottom: 0,
                        width: 'auto',
                        paddingRight: 10,
                        marginRight: 15,
                      }}
                    />
                  )}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 1)',
                  marginTop: 16,
                }}
              />
            </KeyboardAwareScrollView>
            <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
              {editEntity ? (
                <GradientButton
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={
                    values.name === ''
                      ? ['#999999', '#999999']
                      : ['#FFBA8C', '#FE5C6A']
                  }
                  text="EDIT PLAYER"
                  onPress={() => handleEdit(values)}
                  style={{height: 50, width: '100%', marginTop: 0}}
                  textstyle={{
                    height: 16,
                    fontWeight: '500',
                    fontSize: 14,
                    letterSpacing: 0.5,
                    lineHeight: 19,
                  }}
                />
              ) : (
                <GradientButton
                  start={{x: 0, y: 0}}
                  end={{x: 2, y: 0}}
                  colors={
                    values.name === ''
                      ? ['#999999', '#999999']
                      : ['#FFBA8C', '#FE5C6A']
                  }
                  text="SAVE PLAYER"
                  onPress={handleSubmit}
                  style={{height: 50, width: '100%', marginTop: 0}}
                  textstyle={{
                    height: 16,
                    fontWeight: '500',
                    fontSize: 14,
                    letterSpacing: 0.5,
                    lineHeight: 19,
                  }}
                />
              )}
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  form: {
    paddingHorizontal: 50,
    marginTop: 10,
  },
  designation: {
    height: 16,
    color: '#999999',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginRight: 10.5,
  },
});
