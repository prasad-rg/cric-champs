import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AppBar from '../components/AppBar';
import {TextField} from 'rn-material-ui-textfield';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import { forgotPassword } from '../services/viewTournament';
import Toast from 'react-native-simple-toast';


const forgotPasswordValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
});

const ForgotPasswordScreen = ({navigation}) => {
  const handleforgot = async values => {
     const response = await forgotPassword(values.email)
     console.log("forgot response",response)
     if(response.status){
      Toast.show("OTP sent successfully")
      navigation.navigate('VerifyOtp',{email:values.email})
     } else {
      Toast.show("Something went wrong..Please try again")
     }

  };
  return (
    <View style={styles.container}>
      <AppBar navigation={navigation} title="Forgot Password"/>
      <Formik
        validationSchema={forgotPasswordValidationSchema}
        initialValues={{email: ''}}
        onSubmit={values => handleforgot(values)}>
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
              <View style={styles.contentContainer}>
                <Image
                  source={require('../../assets/images/sendEmail.png')}
                  style={styles.image}
                />
                <Text style={styles.heroText}>Forgot your password?</Text>
                <Text style={styles.secondaryText}>
                  Enter your registered email below {'\n'} to receive password
                  reset instructions
                </Text>
              </View>
              <View style={styles.emailField}>
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
                  autoCorrect={false}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
            </KeyboardAwareScrollView>
            <GradientButton
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#FFBA8C', '#FE5C6A']}
              text="SUBMIT"
              onPress={handleSubmit}
              style={styles.buttonStyle}
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
    backgroundColor: 'rgba(255,255,255,0.87)',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 56,
  },
  image: {
    width: 147,
    height: 147,
  },
  heroText: {
    color: '#4A4A4A',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    marginTop: 31,
  },
  secondaryText: {
    color: '#9B9B9B',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 21,
    textAlign: 'center',
  },
  emailField: {
    paddingHorizontal: 50,
    paddingVertical: 40,
  },
  buttonStyle: {
    width: '100%',
    marginBottom: 10,
    height: 48,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default ForgotPasswordScreen;
