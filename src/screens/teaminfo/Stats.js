import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Stats = ({navigation}) => {
  const Details = [
    {
      id: 1,
      title: 'Captain',
      value: 'Sailesh H (c)',
    },
    {
      id: 2,
      title: 'City',
      value: 'Udupi',
    },
    {
      id: 3,
      title: 'Matches',
      value: '5',
    },
    {
      id: 4,
      title: 'Wins',
      value: '2',
    },
    {
      id: 5,
      title: 'Losses',
      value: '2',
    },
    {
      id: 6,
      title: 'Draw / Cancelled',
      value: '1',
    },
    {
      id: 7,
      title: 'Points',
      value: '5',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View>
          {Details.map(item => (
            <View key={item.id} style={styles.listview}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  card: {
    height: 'auto',
    // width:"80%",
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 15,
  },
  listview: {
    padding: 20,
    flexDirection: 'row',
  },
  title: {
    height: 24,

    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 24,
  },
  value: {
    height: 24,
    width: '50%',
    color: 'rgba(77,77,77,0.87)',
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 24,
    marginLeft: 'auto',
  },
});
