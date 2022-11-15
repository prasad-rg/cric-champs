import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {color} from 'react-native-reanimated';

const TeamsList = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/cricketTeam.png')}
        resizeMode="cover">
        <View style={styles.backgroundBeyondSafeArea}>
          <SafeAreaView>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.headerText}>
                <TouchableOpacity style={styles.closeButton}>
                  <Image
                    source={require('../../assets/images/backicon.png')}
                    style={styles.backButtonImage}
                  />
                </TouchableOpacity>
                <Text style={styles.teamText}>Teams List</Text>
              </View>

              <View style={styles.addButton}>
                <TouchableOpacity>
                  <Text style={styles.addTeamText}>ADD TEAM</Text>
                </TouchableOpacity>
              </View>
            </View>
         
          </SafeAreaView>
        </View>
      </ImageBackground>
        <View style={styles.secondView}>
          <Text style={styles.teams}>Teams</Text>
          </View>
    </View>
  );
};

export default TeamsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileDetailsContainer: {
    height: 309,
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
  teamText: {
    height: 24,
    width: 100,
    color: 'rgba(255,255,255,0.87)',
    fontFamily: 'Roboto',
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
  addTeamText: {
    height: 14,
    width: 60,
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
    lineHeight: 14,

    alignSelf: 'center',
  },
  addButton: {
    height: 42,
    width: 210,
    borderWidth: 2,
    borderRadius: 20,
    boxShadow: '0 8 30 0 rgba(223,223,223,0.37)',
    borderColor: '#FFFFFF',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop:210,
  },
  teams:{
    height: 16,
//   width: 43,
  color: '#8E9BA8',
  fontFamily: 'Roboto',
  fontSize: 14,
  fontWeight: '500',
  letterSpacing: 0,
  lineHeight: 16,
  margin:20,
  },
  secondView:{
    backgroundColor:"rgba(255,255,255,0.87)",
    flex:1,
  },







  avatar: {
    width: 64,
    height: 64,
    borderRadius: 50,
  },
  nameText: {
    fontFamily: 'Roboto-Medium',
    color: '#DEEBFB',
    fontSize: 14,
    lineHeight: 16,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  emailText: {
    color: 'rgba(236, 239, 241, 0.5)',
    fontSize: 12,
    lineHeight: 14,
  },
  listContainer: {
    padding: 28,
    paddingTop: 17,
  },
  line: {
    borderWidth: 1,
    borderColor: '#EEF1F4',
  },
  text: {
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.87)',
    marginTop: 25,
  },
  logout: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    height: 48,
    width: '100%',
    paddingLeft: 28,
  },
  logoutText: {
    fontSize: 14,
    lineHeight: 16,
    color: 'rgba(0,0,0,0.87)',
  },
});
