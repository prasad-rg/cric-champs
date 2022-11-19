import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AppBar from '../components/AppBar';
import {TextField} from 'rn-material-ui-textfield';
import {Formik} from 'formik';
import * as yup from 'yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import {createFormData} from '../utils/createFormData';
import {useDispatch, useSelector} from 'react-redux';
import {userRegister} from '../redux/authSlice';

const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    )
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const SetPasswordScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {isLoading, isLoggedIn, error} = useSelector(state => state.auth);
  console.info(isLoading, isLoggedIn, error);
  return (
    <View style={styles.container}>
      <Formik
        validationSchema={passwordValidationSchema}
        initialValues={{password: '', confirmPassword: ''}}
        onSubmit={values => {
          const formData = createFormData({
            ...route.params.regDetails,
            password: values.password,
          });
          // console.log({
          //   ...route.params.regDetails,
          //   password: values.password,
          // });
          dispatch(userRegister(formData));
          // registerUser(formData);
        }}>
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
            <AppBar navigation={navigation} title="Set Password" />
            <KeyboardAwareScrollView>
              <View style={styles.contentContainer}>
                <Image
                  source={require('../../assets/images/resetPass.png')}
                  style={styles.image}
                />
                <Text style={styles.heroText}>Set your password</Text>
              </View>
              <View style={styles.emailField}>
                <TextField
                  label="Set Password"
                  name="password"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(153, 153, 153, 0.4)"
                  baseColor="rgba(0, 0, 0, .38)"
                  lineWidth={1}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(153, 153, 153, 0.4)"
                  baseColor="rgba(0, 0, 0, .38)"
                  lineWidth={1}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                  secureTextEntry={true}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
            </KeyboardAwareScrollView>
            <GradientButton
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#FFBA8C', '#FE5C6A']}
              text="SUBMIT"
              // onPress={() => navigation.navigate('RegistrationSuccessScreen')}
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

export default SetPasswordScreen;
