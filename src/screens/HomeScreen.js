import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';

import React from 'react';
import GradientButton from '../components/GradientButton';
import OutlinedButton from '../components/OutlinedButton';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Pressable>
        <Image
          source={require('../../assets/images/burgermenu.png')}
          style={styles.burgermenu}
        />
        </Pressable>
        <Text style={styles.cricket}>Cricket</Text>
      </View>
      <View>
        <View style={styles.subheader}>
          <Text style={styles.viewManage}>View or Manage Tournament</Text>
        </View>
        <View>
          <Text style={styles.enterTournament}>
            Enter tournament code to view / manage
          </Text>
          <View style={styles.middleView}>
            <TextInput style={styles.textInput} />
            <OutlinedButton text='ENTER'/>
          </View>
          <Text style={styles.codeAcquired}>
            Code can be acquired from the admin.
          </Text>
          <Text style={styles.or}>Or</Text>
          <GradientButton
            start={{x: 0, y: 0}}
            end={{x: 2, y: 0}}
            colors={['#FFBA8C', '#FE5C6A']}
            text="CREATE TOURNAMENT"
            // onPress={}
            //  style={{width:'100%'}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  // text:{
  //   fontFamily:'HelveticaNeue Bold'
  textInput: {
    boxSizing: 'border-box',
    height: 41,
    width: 163,
    borderWidth: 1,
    borderColor: '#9DB7D6',
    opacity: 0.54,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
  },

  header: {
    height: 56,
    width: '100%',
    backgroundColor: '#0E85FF',
    alignItems: 'center',
    flexDirection: 'row',
  },
  burgermenu: {
    height: 12,
    width: 18,
    marginLeft: 17,
  },
  cricket: {
    height: 24,
    width: 64,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 31,
  },
  subheader: {
    height: 48,
    width: '100%',
    backgroundColor: '#EEF1F4',
    justifyContent: 'center',
  },
  viewManage: {
    height: 19,
    color: '#8E9BA8',
    fontFamily: 'Roboto',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    marginLeft: 15,
  },
  enterTournament: {
    height: 19,
    color: 'rgba(0,0,0,0.87)',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  codeAcquired: {
    marginTop: 10,
    height: 16,
    opacity: 0.5,
    color: '#9B9B9B',
    fontFamily: 'Roboto',
    fontSize: 12,
    letteSpacing: 0,
    lineHeight: 14,
    textAlign: 'center',
  },
  middleView: {
    marginTop: 20,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  or: {
    height: 19,
    color: '#000000',
    fontFamily: 'Roboto',
    fontSize: 14,
    letterSpacing: 0,
    lineheight: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
