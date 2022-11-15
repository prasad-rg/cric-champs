import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handelLogin = () => {
    console.log(email, password);
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
          <TextField
            label="Email"
            keyboardType="email-address"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
            lineWidth={1}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
          />
          <TextField
            label="Password"
            keyboardType="email-address"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            lineWidth={1}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="LOGIN"
            onPress={() => handelLogin()}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '90%'}}
          />
          <View style={styles.eitherSideLineComntainer}>
            <View style={styles.lineEitherSide} />
            <View>
              <Text style={styles.centeredText}>Or</Text>
            </View>
            <View style={styles.lineEitherSide} />
          </View>
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#7197E1', '#7197E1']}
            text="LOGIN WITH FACEBOOK"
            // onPress={}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{width: '90%'}}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
});

export default LoginScreen;
