import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import AddProfileDetails from '../components/AddProfileDetails';
import {TextField} from 'rn-material-ui-textfield';
import GradientButton from '../components/GradientButton';
import RadioButton from '../components/RadioButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';

const radio_props = [
  {label: 'Male', value: 'Male', id: 0},
  {label: 'Female', value: 'Female', id: 1},
];

const registrationValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .matches(/(\w.+\s).+/, 'Enter your First Name and Last Name')
    .required('Full name is required'),
  phoneNumber: yup.string().matches(/(\d){10}\b/, 'Enter a valid phone number'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email is required'),
});

const RegisterUserScreen = ({navigation}) => {
  const [gender, setGender] = useState('');
  const getData = data => {
    setGender(data);
  };

  return (
    <View style={styles.primaryContainer}>
      <Formik
        validationSchema={registrationValidationSchema}
        initialValues={{
          email: '',
          fullName: '',
          phoneNumber: '',
          city: '',
        }}
        onSubmit={values => console.log({...values, gender: gender})}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
          touched,
        }) => (
          <>
            <KeyboardAwareScrollView>
              <AddProfileDetails navigation={navigation} title="Register">
                <View style={styles.container}>
                  <TextField
                    label="Full Name"
                    name="fullName"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#666666"
                    tintColor="rgba(153, 153, 153, 0.4)"
                    baseColor="rgba(0, 0, 0, .38)"
                    lineWidth={1}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#666666',
                      fontSize: 15,
                      letterSpacing: 0.57,
                    }}
                  />
                  {errors.fullName && touched.fullName && (
                    <Text style={styles.errorText}>{errors.fullName}</Text>
                  )}
                  <TextField
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#666666"
                    tintColor="rgba(153, 153, 153, 0.4)"
                    baseColor="rgba(0, 0, 0, .38)"
                    lineWidth={1}
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#666666',
                      fontSize: 15,
                      letterSpacing: 0.57,
                    }}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <TextField
                    label="Phone No (Optional)"
                    name="phoneNumber"
                    keyboardType="email-address"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#666666"
                    tintColor="rgba(153, 153, 153, 0.4)"
                    baseColor="rgba(0, 0, 0, .38)"
                    lineWidth={1}
                    autoCapitalize="none"
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#666666',
                      fontSize: 15,
                      letterSpacing: 0.57,
                    }}
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )}
                  <TextField
                    label="City (Optional)"
                    name="city"
                    formatText={this.formatText}
                    onSubmitEditing={this.onSubmit}
                    ref={this.fieldRef}
                    textColor="#666666"
                    tintColor="rgba(153, 153, 153, 0.4)"
                    baseColor="rgba(0, 0, 0, .38)"
                    lineWidth={1}
                    onChangeText={handleChange('city')}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    style={{
                      fontFamily: 'Roboto-Medium',
                      color: '#666666',
                      fontSize: 15,
                      letterSpacing: 0.57,
                    }}
                  />
                  {errors.city && touched.city && (
                    <Text style={styles.errorText}>{errors.city}</Text>
                  )}
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <RadioButton
                      radio_props={radio_props}
                      formHorizontal={true}
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{width: 97, marginRight: 25}}
                      onPress={getData}
                    />
                  </View>
                </View>
              </AddProfileDetails>
            </KeyboardAwareScrollView>
            <GradientButton
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#FFBA8C', '#FE5C6A']}
              text="PROCEED"
              onPress={() => navigation.navigate('SetPasswordScreen')}
              // onPress={handleSubmit}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '100%', marginBottom: 10, height: 48}}
            />
          </>
        )}
      </Formik>
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
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default RegisterUserScreen;
