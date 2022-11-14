import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import GradientButton from '../../components/GradientButton';
import Welcome from '../../../assets/images/Welcome.png';

const OnBoardingScreenOne = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <View style={styles.skipView}>
            <Text style={styles.skipButton}>SKIP</Text>
          </View>
        </TouchableOpacity>

        <Image source={Welcome} style={styles.welcome} />
        <View style={styles.circleView}>
          <Text style={styles.circle1}></Text>
          <Text style={styles.circle2}></Text>
          <Text style={styles.circle2}></Text>
        </View>
        <View>
          <Text style={styles.boldText}>Welcome to Cric Champs!</Text>
          <Text style={styles.paraText}>
            Your one stop app for Creating and managing{'\n'}
            your own cricket tournaments and share it{'\n'} with your viewers
          </Text>
        </View>
        <View style={styles.bottomView}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="NEXT"
          onPress={() => navigation.navigate('OnBoardingScreenTwo')}
          style={{height:50,width:"100%"}} 
          textstyle={{height:16,fontWeight:"500",fontSize:14,letterSpacing:0.5,lineHeight:19,width:38}}
          />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardingScreenOne;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: '100%',
  },
  skipView: {
    alignSelf: 'flex-end',
    marginTop: 25,
    marginRight: 17,
  },
  skipButton: {
    height: 17,
    // width:133,
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.5,
    lineHeight: 19,
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    color: '#0066E2',
    borderRadius: 1,
    padding: 1,
  },
  welcome: {
    height: 400,
    width: 350,
    // justifyContent: 'center',
    alignSelf: 'center',
  },
  circleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    height: 9,
    width: 9,
    backgroundColor: '#FA7171',
    overflow: 'hidden',
    borderRadius: 9 / 2,
    marginHorizontal: 4,
  },
  circle2: {
    height: 7,
    width: 7,
    overflow: 'hidden',
    borderRadius: 7 / 2,
    backgroundColor: 'rgba(250,113,113,0.5)',
    marginHorizontal: 4,
  },
  boldText: {
    color: '#4A4A4A',
    height: 21,
    // width: 252,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 35,
    alignSelf: 'center',
  },
  paraText: {
    fontFamily: 'Roboto-Regular',
    color: '#4A4A4A',
    //    height:55,
    //    width:273,
    fontSize: 15,
    letterSpacing: 0.3,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 25,
  },
  bottomView:{
marginTop:95
  }
  
});
