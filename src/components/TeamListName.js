import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const TeamListName = ({source, text}) => {
  return (
    <View>
      <View style={styles.card}>
        <Image source={source} style={styles.team} />
        <Text style={styles.teamName}>{text}</Text>
      </View>
    </View>
  );
};

export default TeamListName;

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

  team: {
    height: 49,
    width: 49,
    borderRadius: 24,
    overflow: 'hidden',
    // borderWidth:1,
  },
  teamName: {
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
});
