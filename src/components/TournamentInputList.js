import {SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

const TournamentInputList = ({text,number}) => {
  return (

      <View style={styles.card}>
        <Text style={styles.teams}>{text}</Text>
        <View style={styles.arrowView}>
          <Text style={styles.number}>{number}</Text>
          <TouchableOpacity>
          <Image
            source={require('../../assets/images/forward_arrow.png')}
            style={styles.image}
          />
          </TouchableOpacity>
        </View>
      </View>

  );
};

export default TournamentInputList;

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
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teams: {
    height: 16,
    color: '#666666',
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 15.36,
  },
  number: {
    height: 19,
    //   width: 9,
    color: '#666666',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 19,
    paddingRight: 15,
  },
  arrowView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#F5A623',
    tintColor: '#FFFFFF',
  },
});
