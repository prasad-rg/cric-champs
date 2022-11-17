import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';
import {loginUser} from '../services/auth';

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handelLogin = async values => {
    setError('');
    setIsLoading(true);
    const response = await loginUser(values);
    if (response.statusCode !== 200) {
      setError(response);
      setIsLoading(false);
    }
    if (response.statusCode === 200) {
      setError('');
      setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <SafeAreaView>
          <View style={styles.header}>
            <ImageBackground
              source={require('../../assets/images/loginLogo.png')}
              style={styles.logo}>
              <View style={[styles.triangle]} />
            </ImageBackground>
          </View>
          <Text style={styles.title}>Cric Champs</Text>
          <View style={styles.line} />
        </SafeAreaView>
        <View style={styles.newUser}>
          <Text style={styles.newUserText}>New User?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterUserScreen')}>
            <Text style={styles.register}> Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.form}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => {
              handelLogin(values);
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
                  autoCorrect={false}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <TextField
                  label="Password"
                  name="password"
                  keyboardType="email-address"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#666666"
                  tintColor="rgba(153, 153, 153, 0.4)"
                  lineWidth={1}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize="none"
                />
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                {error && <Text style={styles.errorText}>{error}</Text>}
                <TouchableOpacity
                  style={styles.forgotPasswordButton}
                  onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                {isLoading ? (
                  <View style={{marginTop: 20}}>
                    <ActivityIndicator size="large" color="#FFBA8C" />
                  </View>
                ) : (
                  <GradientButton
                    start={{x: 0, y: 0}}
                    end={{x: 2, y: 0}}
                    colors={['#FFBA8C', '#FE5C6A']}
                    text="LOGIN"
                    onPress={handleSubmit}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{width: '90%'}}
                  />
                )}
              </>
            )}
          </Formik>
          <View style={styles.eitherSideLineComntainer}>
            <View style={styles.lineEitherSide} />
            <View>
              <Text style={styles.centeredText}>Or</Text>
            </View>
            <View style={styles.lineEitherSide} />
          </View>
          {
            <GradientButton
              start={{x: 0, y: 0}}
              end={{x: 2, y: 0}}
              colors={['#7197E1', '#7197E1']}
              text="LOGIN WITH FACEBOOK"
              // onPress={}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{width: '90%'}}
            />
          }
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 167,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    // borderWidth: 1,
  },
  logo: {
    width: 74,
    height: 99,
  },
  title: {
    color: '#0059AD',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: 1,
    fontFamily: 'HelveticaNeue Bold',
  },
  line: {
    borderWidth: 1,
    width: 87,
    marginTop: 8,
    alignSelf: 'center',
    borderColor: 'rgba(0, 89, 173, 0.14)',
  },
  register: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.5,
    lineHeight: 16,
    color: '#FE8579',
  },
  newUser: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 28,
  },
  newUserText: {
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
    fontSize: 14,
  },
  form: {
    paddingHorizontal: 10,
  },
  forgotPasswordButton: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#4A90E2',
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  eitherSideLineComntainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  lineEitherSide: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  centeredText: {
    width: 50,
    textAlign: 'center',
    color: '#858585',
    fontFamily: 'Roboto-Light',
    fontSize: 14,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default LoginScreen;
