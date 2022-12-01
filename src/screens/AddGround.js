import {StyleSheet, View, Platform, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';
import {addGround} from '../redux/GroundSlice';
import {useDispatch, useSelector} from 'react-redux';
import {createFormData} from '../utils/createFormData';
import uuid from 'react-native-uuid';
import {addGrounds, updateGround} from '../services/manageTournament2';
import {setEditEntity} from '../redux/manageTournamentSlice';
import {Formik} from 'formik';
import * as yup from 'yup';
import {cleanSingle} from 'react-native-image-crop-picker';
import { deleteParticularGround } from '../services/manageTournament2';

const AddGround = ({navigation, route}) => {
  const tournamentId = useSelector(
    state => state.tournamentdata.tournamentdata.tournamentid,
  );
  const editEntity = useSelector(state => state.tournamentdata.editEntity);

  const [profilePictureUri, setProfilePictureUri] = useState('');
  const dispatch = useDispatch();
  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
    city: yup.string().required(),
  });

  const handleUpdate = async values => {
    if (profilePictureUri !== '') {
      var formData = createFormData({
        ...values,
        image: profilePictureUri,
        tournamentId: tournamentId,
        groundId: route.params.groundId,
      });
  
    } else {
      var formData = createFormData({
        ...values,
        tournamentId: tournamentId,
        groundId: route.params.groundId,
      });
    }
    
    const response = await updateGround(formData)
    if(response.status){
      navigation.pop(2)
      dispatch(setEditEntity(false))
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: editEntity ? route.params?.groundName : '',
          city: '',
          latitude: '',
          longitude: '',
        }}
        onSubmit={async values => {
          if (profilePictureUri !== '') {
            let data = {
              ...values,
              image: profilePictureUri,
              tournamentId: tournamentId,
            };
            const groundData = createFormData(data);
            const response = await addGrounds(groundData);

            if (response.status) {
              dispatch(addGround(response.data.grounds));
              navigation.goBack();
            } else {
              console.log('Something went wrong');
            }
          }else{
            console.log("Profile Picture not uploaded")
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <KeyboardAwareScrollView>
              {editEntity && profilePictureUri == '' ? (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/ground1.png')}
                  title={editEntity ? 'Edit Ground' : 'Add Ground'}
                  navigation={navigation}
                  getImageUri={getDetails}
                  profilePictureUri={route.params.groundImage}
                />
              ) : (
                <AddProfileDetails
                  backroundImageUri={require('../../assets/images/ground1.png')}
                  title={editEntity ? 'Edit Ground' : 'Add Ground'}
                  navigation={navigation}
                  getImageUri={getDetails}
                />
              )}
              <View style={styles.form}>
                <TextField
                  label="Ground Name"
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
                  defaultValue={editEntity ? route.params.groundName : ''}
                />
                <TextField
                  label="City"
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
                  label="Latitude, (Optional)"
                  keyboardType="email-address"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(0, 0, 0, 0.4)"
                  lineWidth={1}
                  autoCapitalize="none"
                  activeLineWidth={1}
                  onChangeText={handleChange('latitude')}
                  onBlur={handleBlur('latitude')}
                  value={values.phoneNo}
                  style={{
                    fontFamily: 'Roboto-Medium',
                    fontSize: 16,
                    fontWeight: '500',
                    letterSpacing: 0.57,
                    lineHeight: 19,
                  }}
                />
                <TextField
                  label="Longitude, (Optional)"
                  keyboardType="email-address"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(0, 0, 0, 0.4)"
                  lineWidth={1}
                  autoCapitalize="none"
                  activeLineWidth={1}
                  onChangeText={handleChange('longitude')}
                  onBlur={handleBlur('longitude')}
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
                  text="UPDATE GROUND"
                  onPress={() => handleUpdate(values)}
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
                  text="SAVE GROUND"
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

export default AddGround;

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
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginRight: 10.5,
  },
});
