import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';
import uuid from 'react-native-uuid';
import {useDispatch, useSelector} from 'react-redux';
import {createFormData} from '../utils/createFormData';
import Toast from 'react-native-simple-toast';

import {Formik} from 'formik';
import * as yup from 'yup';
import {addUmpires} from '../services/manageTournament2';
import {updateUmpire} from '../services/manageTournament2';
import {setEditEntity} from '../redux/manageTournamentSlice';

const AddUmpire = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const teamId = useSelector(state => state.tournamentdata.teamId);
  const editEntity = useSelector(state => state.tournamentdata.editEntity);
  // console.log(editEntity);

  const [profilePictureUri, setProfilePictureUri] = useState('');
  const dispatch = useDispatch();
  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  const updateParticularUmpire = async values => {
    if (profilePictureUri !== '') {
      var formData = createFormData({
        ...values,
        umpireId: route.params.umpireId,
        teamId: teamId,
        tournamentId: tournamentId,
        image: profilePictureUri,
      });
    } else {
      var formData = createFormData({
        ...values,
        umpireId: route.params.umpireId,
        teamId: teamId,
        tournamentId: tournamentId,
      });
    }
    // console.log(formData)
    const response = await updateUmpire(formData);
    // console.log(response.status)
    // console.log('Response after Player Update', response.status);
    if (response.status) {
      navigation.pop(2);
      dispatch(setIsEdit(false));
      dispatch(setEditEntity(false));
    } else{
      Toast.show("Something went wrong, Please try again 😭")
    }
  };
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: editEntity ? route.params?.umpireName : '',
          city: '',
          phoneNo: '',
        }}
        onSubmit={async values => {
          if (profilePictureUri !== '') {
            let data = {
              ...values,
              image: profilePictureUri,
              tournamentId: tournamentId,
              teamId: teamId,
              role: 'umpire',
              tempId: uuid.v4(),
            };
            const umpireData = createFormData(data);
            setIsLoading(true);
            const response = await addUmpires(umpireData);
            setIsLoading(false);
            console.log('response umpire', response);
            if (response.status) {
              // dispatch(addUmpire(response.data));
              navigation.goBack();
            }else{
              Toast.show("Something went wrong, Please try again 😭")
            }
          }else{
            Toast.show("Umpire profile is required")
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <KeyboardAwareScrollView>
              {editEntity && profilePictureUri === '' ? (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/ground1.png')}
                  title={editEntity ? 'Edit Umpire' : 'Add Umpire'}
                  navigation={navigation}
                  getImageUri={getDetails}
                  profilePictureUri={route.params.umpireLogo}
                />
              ) : (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/ground1.png')}
                  title={editEntity ? 'Edit Umpire' : 'Add Umpire'}
                  navigation={navigation}
                  getImageUri={getDetails}
                />
              )}
              <View style={styles.form}>
                <TextField
                  label="Umpire Name"
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
                  defaultValue={editEntity ? route.params.umpireName : ''}
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
            </KeyboardAwareScrollView>
            {isLoading ? (
              <View style={{marginBottom: 20}}>
                <ActivityIndicator size="large" color="#FFBA8C" />
              </View>
            ) : (
              <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
                {editEntity ? (
                  <GradientButton
                    start={{x: 0, y: 0}}
                    end={{x: 2, y: 0}}
                    colors={['#FFBA8C', '#FE5C6A']}
                    text="UPDATE UMPIRE"
                    onPress={() => updateParticularUmpire(values)}
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
                    colors={['#FFBA8C', '#FE5C6A']}
                    text="SAVE UMPIRE"
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
            )}
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddUmpire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  profileDetailsContainer: {
    height: 297,
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
  addUmpire: {
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
  profile: {
    height: 105,
    width: 105,
    borderRadius: 52,
  },
  profileView: {
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
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
});
