import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';

const CoAdminCard = ({source}) => {
  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View style={styles.profileView}>
          <Image
            source={
              source ? source : require('../../assets/images/profile1.png')
            }
            style={styles.image}
          />
          <Text style={styles.name}>Ashley Varghese</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.matchView}>
          <Text
            style={{
              height: 15,
              width: 106,
              opacity: 0.5,
              color: '#858585',
              fontFamily: 'Roboto-Regular',
              fontSize: 13,
              letterSpacing: 0,
              lineHeight: 15,
              textAlign: 'center',
            }}>
            Match 1, Match 4,
          </Text>
          <Text
            style={{
              height: 15,
              // width: 51,
              color: '#23C05C',
              fontFamily: 'Roboto-Medium',
              fontSize: 13,
              fontWeight: '500',
              letterSpacing: 0,
              lineHeight: 15,
            }}>
            {' '}
            Match 5,
          </Text>
          <Text
            style={{
              height: 15,

              color: '#858585',
              fontFamily: 'Roboto-Regular',
              fontSize: 13,
              letterSpacing: 0,
              lineHeight: 15,
            }}>
            {' '}
            Match 7, Match 9
          </Text>
        </View>
        <View style={styles.messageView}>
          <Text style={styles.message}>Match abondoned due to rain</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoAdminCard;

const styles = StyleSheet.create({
  card: {
    height: 200,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  name: {
    height: 24,
    width: 164,
    color: '#0667D4',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.71,
    lineHeight: 24,
    marginHorizontal: 20,
  },
  profileView: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  line: {
    width: '85%',
    color: '#979797',
    opacity: 0.12,
    borderWidth: 0.3,
    alignSelf: 'center',
  },
  matchView: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'center',
  },
  messageView: {
    height: 24,
    width: 182,
    borderRadius: 4,
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 25,
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
