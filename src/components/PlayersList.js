import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const PlayersList = ({
  source,
  name,
  designation,
  batting,
  expertise,
  bowling,
}) => {
  return (
    // <TouchableOpacity>
    <View style={styles.card}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}>
        <Image source={{uri: source}} style={styles.team} />
        <View>
          <Text style={styles.playerName}>{name}</Text>
          <Text style={styles.playerData}>
            {batting
              ? `${batting} Batsman`
              : bowling
              ? `${bowling} Bowler`
              : expertise
              ? expertise
              : designation
              ? designation
              : ''}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 22,
          width: 62,
          //   backgroundColor: '#B8E986',
          backgroundColor:
            designation == 'Captain'
              ? '#B8E986'
              : designation == 'Vice Captain'
              ? '#FFBA7F'
              : expertise == 'Wicket Keeper'
              ? '#7FC2FF'
              : '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          //   borderWidth: 1,
          marginRight: 14,
          marginTop: 14,
        }}>
      
          <Text
            style={{
              height: 13,
              width: 50,
              color: '#FFFFFF',
              fonFamily: 'Roboto-Black',
              fontSize: 10,
              fontWeight: '900',
              letterSpacing: 0,
              textAlign: 'center',
            }}>
            {designation == 'Captain'
              ? 'CAPTAIN'
              :designation == 'Vice Captain'
              ? 'V C'
              : expertise == 'Wicket Keeper'
              ? 'W C'
              : ' '}
          </Text>
    
      </View>
    </View>
    // </TouchableOpacity>
  );
};

export default PlayersList;

const styles = StyleSheet.create({
  card: {
    height: 70,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  team: {
    height: 49,
    width: 49,
    borderRadius: 24,
    overflow: 'hidden',
    marginVerical: 9,
    marginLeft: 9,
  },
  playerName: {
    height: 15.36,
    width: 178.56,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15.36,
    marginLeft: 14,
    alignSelf: 'center',
  },
  playerData: {
    height: 16,
    width: 144,
    color: '#999999',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
    marginLeft: 14,
  },
});
