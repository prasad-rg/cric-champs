import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// const text = 'LIVE';
const MatchCard = ({text}) => {
  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View
          style={{
            padding: 25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <View>
            <Text style={styles.matchText}>Match 12</Text>
            <Text style={styles.LeagueText}>League Play at Ground 1</Text>
          </View>
          <View
            style={{
              height: 22,
              width: 78,
              borderRadius: 4,
              overflow: 'hidden',
              backgroundColor:
                text == 'ABONDONED'
                  ? '#E05140'
                  : text == 'PAST'
                  ? '#0075E1'
                  : text == 'LIVE'
                  ? '#23C05C'
                  : text == 'UPCOMING'
                  ? '#FCA900'
                  : '#FFFFFF',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                height: 13,
                // width: 60.42,
                width: 'auto',
                color: '#FFFFFF',
                fontFamily: 'Roboto-Black',
                fontSize: 10,
                fontWeight: '900',
                letterSpacing: 0,
                lineHeight: 11,
                textAlign: 'center',
              }}>
              {text}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 45,
            paddingTop: 20,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.name}>Rajput Sports</Text>
            <Text style={styles.number}>98/5</Text>
            <Text style={styles.overs}>(10.0)</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.name}>Super gaints</Text>
            <Text style={styles.number}>43/2</Text>
            <Text style={styles.overs}>(5.6)</Text>
          </View>
        </View>
        <View style={styles.messageView}>
          <Text style={styles.message}>Match abondoned due to rain</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MatchCard;

const styles = StyleSheet.create({
  card: {
    height: 250,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  matchText: {
    height: 16,
    width: 60,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 16,
  },
  LeagueText: {

    color: '#A6A6A6',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
    marginTop: 5,

  },
  line: {
    width: '85%',
    color: '#979797',
    opacity: 0.12,
    borderWidth: 0.3,
    alignSelf: 'center',
  },
  name: {
    // height: 32,
    width: 75,
    color: '#B2B2B2',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 14,
    // textAlign: 'center',
  },
  number: {
    height: 28,
    width: 51,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 5,
    // textAlign: 'center',
  },
  overs: {
    height: 14,
    width: 32,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
    marginTop: 5,
    // textAlign: 'center',
  },
  messageView: {
    height: 24,
    width: 182,
    borderRadius: 4,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
  },
  message: {
    height: 14,
    width: 'auto',
    color: '#949397',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
    textAlign: 'center',
  },
});
