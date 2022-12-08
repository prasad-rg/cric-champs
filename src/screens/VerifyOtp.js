import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import GradientButton from '../components/GradientButton';
import {forgotPassword, verifyOTP} from '../services/viewTournament';
import Toast from 'react-native-simple-toast';
import AppBar from '../components/AppBar';

const VerifyOtp = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleText = string => {
    setText(string);
    setShowError(false);
  };
  const handlePress = async () => {
    const response = await forgotPassword(route?.params?.email);
    console.log('forgot response', response);
    if (response.status) {
      Toast.show('OTP sent successfully');
      console.log('asdfghjkl', response);
      //  navigation.navigate('VerifyOtp',{email:values.email})
    } else {
      Toast.show('Something went wrong..Please try again🥹');
    }
  };
  const handleVerification = async () => {
    const obj = {
      email: route?.params?.email,
      token: text,
    };
    setIsLoading(true);
    const response = await verifyOTP(obj);
    console.log('verify otp', response?.headers['otp-verification-token']);
    setIsLoading(false);
    if (response.status) {
      Toast.show('OTP verified successfully..!');
      navigation.navigate('ResetPassword', {
        token: response?.headers['otp-verification-token'],
        email: route?.params?.email,
      });
    } else {
      setIsLoading(false);
      Toast.show('Something went wrong..Please try again🥹');
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBeyondSafeArea}>
        <AppBar navigation={navigation} title="Verify OTP" />
      </View>
      <ScrollView>
        <Text style={styles.heroText}>Verification Code</Text>
        <Text style={styles.secondaryText}>
          Please fill in the verification code that has been {'\n'} sent to your
          mobile number.
        </Text>
        <View style={{alignSelf: 'center', paddingBottom: 10, paddingLeft: 20}}>
          <View style={styles.textinputView}>
            <TextInput
              name="text"
              style={styles.textInput}
              onChangeText={handleText}
              keyboardType="numeric"
              maxLength={4}
            />
          </View>
          <View style={styles.textInputBorder}>
            <View style={styles.textInputBorderin1}></View>
            <View style={styles.textInputBorderin2}></View>
            <View style={styles.textInputBorderin3}></View>
            <View style={styles.textInputBorderin4}></View>
          </View>
        </View>
        <View style={styles.textView2}>
          <Text style={styles.text3}>Didn’t recieve a code?</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.text4}>Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {isLoading ? (
        <View style={{marginBottom: 20}}>
          <ActivityIndicator size="large" color="#FFBA8C" />
        </View>
      ) : (
        <View style={{marginBottom: Platform.OS === 'ios' ? 10 : 0}}>
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={text ? ['#FFBA8C', '#FE5C6A'] : ['#999999', '#999999']}
            text="SUBMIT"
            style={{height: 50, width: '100%', marginTop: 0}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
            }}
            onPress={handleVerification}
          />
        </View>
      )}
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyondSafeArea: {
    // backgroundColor: 'rgba(0, 102, 226, 1)',
    backgroundColor: '#0E85FF',
    paddingRight: 20,
    paddingLeft: 20,
  },
  heroText: {
    color: '#393939',
    fontSize: 18,
    lineHeight: 21,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    marginTop: 31,
  },
  secondaryText: {
    color: '#7A7A7A',
    fontSize: 14,
    lineHeight: 18,
    marginTop: 21,
    textAlign: 'center',
  },
  textinputView: {
    width: Platform.OS === 'ios' ? '100%' : 'auto',
    marginTop: 70,
    fontSize: 16,
    alignItems: 'center',
  },
  textInput: {
    width: Platform.OS === 'ios' ? '90%' : '110%',
    color: '#393939',
    fontSize: 20,
    letterSpacing: 45,
    fontFamily: 'Roboto-Medium',
    marginLeft: Platform.OS === 'ios' ? 13.512 : 7,
  },
  textInputBorderin1: {
    height: 0.5,
    width: 35,
    opacity: 0.6,
    backgroundColor: '#7A7A7A',
    marginRight: 25,
  },
  textInputBorderin2: {
    height: 0.5,
    width: 35,
    opacity: 0.6,
    backgroundColor: '#7A7A7A',
    marginRight: 25,
  },
  textInputBorderin3: {
    height: 0.5,
    width: 35,
    opacity: 0.6,
    backgroundColor: '#7A7A7A',
    marginRight: 10,
  },
  textInputBorderin4: {
    height: 0.5,
    width: 35,
    opacity: 0.6,
    backgroundColor: '#7A7A7A',
    marginLeft: 10,
  },
  textInputBorder: {
    flexDirection: 'row',
    // marginLeft: 30,
    // borderWidth:1
  },
  textView2: {
    marginTop: 40,
  },
  text3: {
    height: 35,
    color: '#7A7A7A',
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
  text4: {
    color: '#EE5C4D',
    fontSize: 17,
    fontFamily: 'Roboto-Medium',
    textAlign: 'center',
  },
});
