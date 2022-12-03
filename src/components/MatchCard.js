import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

// const text = 'LIVE';
const MatchCard = ({matchDetails}) => {
  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.matchText}>
              Match {matchDetails?.matchNumber}
            </Text>
            <Text style={styles.LeagueText}>
              {`League Play at ${matchDetails?.groundName}  Ground`}
            </Text>
          </View>
          <View
            style={[
              styles.statusContainer,
              {
                backgroundColor:
                  matchDetails?.status.toUpperCase() == 'ABONDONED' ||  matchDetails?.status.toUpperCase() == 'CANCELLED'
                    ? '#E05140'
                    : matchDetails?.status.toUpperCase() == 'PAST'
                    ? '#0075E1'
                    : matchDetails?.status.toUpperCase() == 'LIVE'
                    ? '#23C05C'
                    : matchDetails?.status.toUpperCase() == 'UPCOMING'
                    ? '#FCA900'
                    : '#FFFFFF',
              },
            ]}>
            <Text style={styles.statusText}>
              {matchDetails?.status.toUpperCase()}
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
            <Text style={styles.name}>{matchDetails?.team1Name}</Text>
            {matchDetails?.status.toUpperCase() === 'UPCOMING' ? (
              <>
                <Text style={styles.number}>-</Text>
                <Text style={styles.overs}>-</Text>
              </>
            ) : matchDetails?.status.toUpperCase() === 'ABONDONED' ? (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[0]
                    ? `${matchDetails.scores[0].runs}/${matchDetails.scores[0].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[0]
                    ? `(${matchDetails.scores[0].over}.${matchDetails.scores[0].balls})`
                    : '-'}
                </Text>
              </>
            ) : matchDetails?.status.toUpperCase() === 'LIVE' ? (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[0]
                    ? `${matchDetails.scores[0].runs}/${matchDetails.scores[0].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[0]
                    ? `(${matchDetails.scores[0].over}.${matchDetails.scores[0].balls})`
                    : '-'}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[0]
                    ? `${matchDetails.scores[0].runs}/${matchDetails.scores[0].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[0]
                    ? `(${matchDetails.scores[0].over}.${matchDetails.scores[0].balls})`
                    : '-'}
                </Text>
              </>
            )}
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.name}>{matchDetails?.team2Name}</Text>
            {matchDetails?.status.toUpperCase() === 'UPCOMING' ? (
              <>
                <Text style={styles.number}>-</Text>
                <Text style={styles.overs}>-</Text>
              </>
            ) : matchDetails?.status.toUpperCase() === 'ABONDONED' ? (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[1]
                    ? ` ${matchDetails.scores[1].runs}/${matchDetails.scores[1].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[1]
                    ? `(${matchDetails.scores[1].over}.${matchDetails.scores[1].balls})`
                    : '-'}
                </Text>
              </>
            ) : matchDetails?.status.toUpperCase() === 'LIVE' ? (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[1]
                    ? ` ${matchDetails.scores[1].runs}/${matchDetails.scores[1].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[1]
                    ? `(${matchDetails.scores[1].over}.${matchDetails.scores[1].balls})`
                    : '-'}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.number}>
                  {matchDetails?.scores[1]
                    ? ` ${matchDetails.scores[1].runs}/${matchDetails.scores[1].wickets}`
                    : '-'}
                </Text>
                <Text style={styles.overs}>
                  {matchDetails?.scores[1]
                    ? `(${matchDetails.scores[1].over}.${matchDetails.scores[1].balls})`
                    : '-'}
                </Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.messageView}>
          {matchDetails?.status.toUpperCase() === 'UPCOMING' ? (
            <Text style={styles.message}>
              {matchDetails?.matchDateInEnglish},{' '}
              {matchDetails?.matchStartTimingInNormal} IST
            </Text>
          ) : matchDetails?.status.toUpperCase() === 'ABONDONED' ? (
            <Text style={styles.message}>{matchDetails?.statusMessage}</Text>
          ) : matchDetails?.status.toUpperCase() === 'LIVE' ? (
            <Text style={styles.message}>{matchDetails?.statusMessage}</Text>
          ) : (
            <Text style={styles.message}>{matchDetails?.statusMessage}</Text>
          )}
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
  cardHeader: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  number: {
    height: 28,
    // width: 51,
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 28,
    marginTop: 5,
    textAlign: 'center',
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
    textAlign: 'center',
    // borderWidth: 1,
    // width: 33,
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
  statusContainer: {
    height: 22,
    width: 78,
    borderRadius: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
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
  },
});
