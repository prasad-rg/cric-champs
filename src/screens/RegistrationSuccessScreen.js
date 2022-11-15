import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useState} from 'react';
import AppBar from '../components/AppBar';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GradientButton from '../components/GradientButton';

const RegistrationSuccessScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  return (
    <View style={styles.container}>
      <AppBar
        navigation={navigation}
        title=""
        style={{backgroundColor: 'transparent'}}
        iconTint={{tintColor: undefined}}
      />
      <KeyboardAwareScrollView>
        <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/images/AwesomeBall.png')}
            style={styles.image}
          />
          <Text style={styles.heroText}>Awesome!!</Text>
          <Text style={styles.successText}>
            You have Successfully Registered
          </Text>
          <Text style={styles.secondaryText}>
            Kindly open the verification email we sent{'\n'}to your registered
            email ID and verify{'\n'}your account.
          </Text>
        </View>
        <View style={styles.emailField}>
          <TextField
            label="Set Password"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
            lineWidth={1}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            value={email}
          />
          <TextField
            label="Confirm Password"
            formatText={this.formatText}
            onSubmitEditing={this.onSubmit}
            ref={this.fieldRef}
            textColor="#666666"
            tintColor="rgba(153, 153, 153, 0.4)"
            baseColor="rgba(0, 0, 0, .38)"
            lineWidth={1}
            onChangeText={text => setEmail(text)}
            autoCapitalize="none"
            value={email}
          />
        </View>
      </KeyboardAwareScrollView>
      <GradientButton
        start={{x: 0, y: 0}}
        end={{x: 2, y: 0}}
        colors={['#FFBA8C', '#FE5C6A']}
        text="CREATE TOURNAMENT"
        onPress={() => navigation.navigate('RegistrationSuccessScreen')}
        style={styles.buttonStyle}
      />
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
    width: 200,
    height: 196,
  },
  heroText: {
    color: '#4A4A4A',
    fontSize: 28,
    lineHeight: 33,
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
  successText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    color: '#4A4A4A',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
  },
});

export default RegistrationSuccessScreen;
