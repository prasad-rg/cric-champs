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
  
import boardingpage3 from "/Volumes/Development/CricChamps/cric-champs/assets/images/boardingpage3.png"
import GradientButton from '../../components/GradientButton';
  
  const OnBoardingScreenThree = ({navigation}) => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
       
          <Image source={boardingpage3} style={styles.welcome} />
          <View style={styles.circleView}>
          <Text style={styles.circle2}></Text>
            <Text style={styles.circle2}></Text>
            <Text style={styles.circle1}></Text>
          </View>
          <View>
            <Text style={styles.boldText}>View Tournaments</Text>
            <Text style={styles.paraText}>
             Use Tournament code to get access for  {'\n'}
              viewing live scores and updates of {'\n'} a tournament.
            </Text>
          </View>
          <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="LET'S START"
          onPress={() => navigation.navigate('HomeScreen')}
        />
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default OnBoardingScreenThree;
  
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      width:"100%"
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
      width: 400,
    // margin:60,
      alignSelf:"center"
    },
    circleView: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // marginBottom:30,
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
      fontSize: 14,
      letterSpacing: 0,
      lineHeight: 19,
      textAlign: 'center',
      marginTop: 18,
    },
    Button:{
  borderWidth:1,
  alignSelf:"center",
    
    }
  });
  