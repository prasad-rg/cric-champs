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

import boardingpage2 from '../../../assets/images/boardingpage2.png';
import GradientButton from '../../components/GradientButton';
import {useDispatch} from 'react-redux';
import {changeInitialLaunchStatus} from '../../redux/authSlice';

const OnBoardingScreenTwo = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <TouchableOpacity onPress={() => dispatch(changeInitialLaunchStatus())}>
          <View style={styles.skipView}>
            <Text style={styles.skipButton}>SKIP</Text>
          </View>
        </TouchableOpacity>
        <Image source={boardingpage2} style={styles.welcome} />
        <View style={styles.circleView}>
          <Text style={styles.circle2} />
          <Text style={styles.circle1} />
          <Text style={styles.circle2} />
        </View>
        <View>
          <Text style={styles.boldText}>Create & Manage Tournaments</Text>
          <Text style={styles.paraText}>
            Create Fixtures by inputting teams,grounds, {'\n'}
            umpires, overs etc. and manage {'\n'} them thereafter.
          </Text>
        </View>
      </ScrollView>
        <View style={{marginBottom: Platform.OS === 'ios' ? -10 : 0}}>
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="NEXT"
            onPress={() => navigation.navigate('OnBoardingScreenThree')}
            style={{height: 50, width: '100%'}}
            textstyle={{
              height: 16,
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: 0.5,
              lineHeight: 19,
              width: 38,
            }}
          />
        </View>
    </SafeAreaView>
  );
};

export default OnBoardingScreenTwo;

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

    alignSelf: 'center',
  },
  circleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop:1
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
    letterSpacing: 0.4,
    lineHeight: 19,
    textAlign: 'center',
    marginTop: 25,
  },
  // bottomView: {
  //   marginTop: 95,
  // },
});
