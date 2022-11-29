import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import StadiumList from '../../components/StadiumList';
import TeamListName from '../../components/TeamListName';

const InfoScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.teamView}>
            <Image
              source={require('../../../assets/images/team1.png')}
              style={styles.image}
            />
            <Text style={styles.teamText}>UDL strikers</Text>
          </View>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.teamView}>
            <Text style={styles.teamText}>UDL strikers</Text>
            <Image
              source={require('../../../assets/images/team5.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.line} />
        <View style={{marginTop:10,alignItems:"center"}}>
          <Text style={styles.matchText}>Match 1</Text>
          <Text style={styles.tournamnetText}>Tournament 1</Text>
          <Text style={styles.timeText}>Mon, Nov 28 2022,10:00 AM</Text>
        </View>
      </View>
      <Text style={styles.headingName}>Stadium</Text>
 
      <TeamListName text="Udupi"/>
 
      <Text style={styles.headingName}>Umpire</Text>
      <TeamListName text="UUUUUU"/>
      <Text style={styles.headingName}>Captains</Text>
      <StadiumList text="xxxxx" place="Udupi"/>
    </View>
  );
};

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  cardView: {
    height: 150,
    width: '90%',
    // flexDirection:"row",
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    margin:20
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  teamView: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // flexDirection:"row",
    // borderWidth: 1,
  },
  teamText: {
    // height: 16,
    width: 90,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    // lineHeight: 15.36,
    marginHorizontal: 10,
    // justifyContent:"center"
  },
  vsText: {
    height: 16,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    marginVertical:15

  },
  line: {
    width: '85%',
    color: '#979797',
    opacity: 0.12,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop:10
  },
  tournamnetText:{
    height: 16,
    color: '#000000',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
  },
  matchText:{
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
  },
  timeText:{
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    marginTop:6
  },
  headingName:{
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    marginHorizontal:20,
    marginTop:10
  }
});
