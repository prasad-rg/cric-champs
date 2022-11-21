import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React, { useState } from 'react';

import RadioButton from '../components/RadioButton';
import GradientButton from '../components/GradientButton';
const OversScreen = ({navigation}) => {
  const [overs, setOvers] = useState('');

  const oversData ={
    overs:overs,
    tournamentId:'',
  }

  const radio_props = [
    {label: '5', value: '5', id: 0},
    {label: '10', value: '10', id: 1},
    {label: '15', value: '15', id: 2},
    {label: '20', value: '20', id: 3},
    {label: '25', value: '25', id: 4},
    {label: '30', value: '30', id: 5},
    {label: '40', value: '40', id: 6},
    {label: '50', value: '50', id: 7},
  ];
  const handlePress = () =>{
    navigation.navigate('Ground')
  }
  const getData= data =>{
    setOvers(data)
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/ball_in_ground.png')}
          resizeMode="cover">
          <View style={styles.backgroundBeyondSafeArea}>
            <SafeAreaView>
              <View style={styles.profileDetailsContainer}>
                <View style={styles.headerText}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/backicon.png')}
                      style={styles.backButtonImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.overText}>Overs</Text>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.overs}>Select number of overs</Text>
        </View>

        <View
          style={{
            width: '80%',
            marginHorizontal: 20,
            flexWrap: 'wrap',
          }}>
          <RadioButton
            radio_props={radio_props}
            formHorizontal={true}
            style={{width: 70, marginRight: 15, marginBottom: 15}}
            flexWrap={{flexWrap: 'wrap'}}
            onPress={getData}
          />
        </View>
      </ScrollView>
      <View style={{marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="PROCEED"
          style={{height: 50, width: '100%', marginTop: 0}}
          textstyle={{
            height: 16,
            fontWeight: '500',
            fontSize: 14,
            letterSpacing: 0.5,
            lineHeight: 19,
          }}
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default OversScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(217,226,233,0.5)',
  },
  profileDetailsContainer: {
    height: 280,
    marginTop: 15,
  },
  backButtonImage: {
    height: 20,
    width: 20,
  },

  backgroundBeyondSafeArea: {
    backgroundColor: 'rgba(0, 102, 226, 0.85)',
    paddingRight: 20,
    paddingLeft: 20,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overText: {
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily:"Roboto-Medium",
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 40,
  },
  overs: {
    height: 16,
    color: '#8E9BA8',
    fontFamily:"Roboto-Medium",
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 16,
    margin: 20,
  },
  secondView: {
    flex: 1,
  },
});
