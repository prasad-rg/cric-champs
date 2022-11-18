import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import StadiumList from '../components/StadiumList';
import GradientButton from '../components/GradientButton';

const Ground = ({navigation}) => {

  const handlePress=()=>{
    navigation.navigate('UmpiresScreen')
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/stadium3.png')}
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
                  <Text style={styles.groundText}>Grounds</Text>
                </View>

                <TouchableOpacity style={styles.groundButton}>
                  <Text style={styles.addGroundText}>ADD GROUND</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
        </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.ground}>Grounds</Text>

          <View style={styles.groundView}>
            <StadiumList
              source={require('../../assets/images/ground1.png')}
              text="Santhekatte Stadium"
              place="Santhekatte"
            />
            <StadiumList
              source={require('../../assets/images/ground2.png')}
              text="Manjunath Stadium"
              place="Udupi"
            />
            <StadiumList
              source={require('../../assets/images/ground3.png')}
              text="Surathkal Sports Academy"
              place="Surathkal"
            />
          </View>
        </View>
      </ScrollView>
      <View>
        <GradientButton
          start={{x: 0, y: 0}}
          end={{x: 2, y: 0}}
          colors={['#FFBA8C', '#FE5C6A']}
          text="PROCEED"
          style={{height: 50, width: '100%', marginBottom: 20, marginTop: 0}}
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

export default Ground;

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
  groundText: {
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
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addGroundText: {
    height: 14,
    // width: 60,
    color: '#FFFFFF',
    fontFamily:"Roboto-Medium",
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  groundButton: {
    height: 42,
    width: 210,
    borderWidth: 2,
    borderRadius: 20,

    borderColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  ground: {
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
  groundView: {
    marginTop: -15,
  },
  card: {
    height: 68,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,

    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
  },
});
