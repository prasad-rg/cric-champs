import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MatchCard = () => {
  return (
    <SafeAreaView>
      <View style={styles.card}>
        <View><Text></Text></View>
      </View>
    </SafeAreaView>
  );
};

export default MatchCard;

const styles = StyleSheet.create({
  card: {
    height: 212,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 15,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
});
