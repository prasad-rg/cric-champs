import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const PlayersList = ({source, text}) => {
  return (
    <View style={styles.card}>
      <View style={{alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
        <Image source={{uri: source}} style={styles.team} />
        <View>
          <Text style={styles.playerName}>{text}</Text>
          <Text style={styles.playerData}>{text}</Text>
        </View>
      </View>
      <View
        style={{
          height: 22,
          width: 62,
          backgroundColor: '#B8E986',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
        //   borderWidth: 1,
          marginRight:14,
          marginTop:14,
        }}>
        <TouchableOpacity>
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
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent:'space-between',
  },

  team: {
    height: 49,
    width: 49,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    marginVerical:9,
    marginLeft:9,
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
  playerData:{
    height: 16,
    width: 144,
    color: '#999999',
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
    marginLeft: 14,
  },
});
