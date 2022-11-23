import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import AddProfileDetails from '../components/AddProfileDetails';
import uuid from 'react-native-uuid';
import {useDispatch} from 'react-redux';
import {createFormData} from '../utils/createFormData';

import {Formik} from 'formik';
import * as yup from 'yup';
import {addUmpire} from '../redux/umpireSlice';
import {addUmpires} from '../services/manageTournament2';

const AddUmpire = ({navigation}) => {
  const [profilePictureUri, setProfilePictureUri] = useState('');
  const dispatch = useDispatch();
  const getDetails = data => {
    setProfilePictureUri(data);
  };
  const addPlayerValidationSchema = yup.object().shape({
    name: yup.string().required(),
  });

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={addPlayerValidationSchema}
        initialValues={{
          name: '',
          city: '',
          phoneNo: '',
        }}
        onSubmit={async values => {
          if (profilePictureUri !== '') {
            let data = {
              ...values,
              image: profilePictureUri,
              tournamentId: '637dbe83d4609e8e64d63b32',
              teamId: '637dc46a4fd8760b8d0da1cc',
              role: 'umpire',
              tempId: uuid.v4(),
            };
            const umpireData = createFormData(data);
            const response = await addUmpires(umpireData);
            if (response.status) {
              dispatch(addUmpire(response.data.grounds));
              navigation.navigate('UmpiresList');
            }
          } else {
            Alert.alert('Please Add profile picture');
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <KeyboardAwareScrollView>
              <AddProfileDetails
                backroundImageUri={require('../../assets/images/ground1.png')}
                title="Add Umpire"
                navigation={navigation}
                getImageUri={getDetails}
              />
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
              </View>
            </KeyboardAwareScrollView>
            <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
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
            </View>
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
