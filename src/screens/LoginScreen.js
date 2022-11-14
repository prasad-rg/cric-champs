import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {
  TextField,
  FilledTextField,
  OutlinedTextField,
} from 'rn-material-ui-textfield';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
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
        <Text style={styles.register}> Register</Text>
      </View>
      <TextField
        label="Phone number"
        keyboardType="phone-pad"
        formatText={this.formatText}
        onSubmitEditing={this.onSubmit}
        ref={this.fieldRef}
      />
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
    borderWidth: 1,
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
});

export default LoginScreen;
