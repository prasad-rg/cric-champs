import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const StadiumList = ({source, text, place}) => {
  return (
    <View>
      <View style={styles.card}>
        <Image source={source} style={styles.ground} />
        <View style={{justifyContent: 'center'}}>
          <Text style={styles.groundName}>{text}</Text>
          <Text style={styles.place}>{place}</Text>
        </View>
      </View>
    </View>
  );
};

export default StadiumList;

const styles = StyleSheet.create({
  card: {
    height: 70,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
    padding: 10,
    flexDirection: 'row',
  },

  ground: {
    height: 49,
    width: 49,
    borderRadius: 24,
    overflow: 'hidden',
  },
  groundName: {
    height: 15.36,
    width: 178.56,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15.36,
    marginHorizontal: 25,
    alignSelf: 'center',
  },
  place: {
    height: 14,
    width: 144,
    color: '#999999',
    fontFamily: 'Roboto-Medium',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
    marginHorizontal: 25,
    marginTop: 3,
  },
});
