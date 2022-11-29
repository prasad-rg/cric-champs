import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';

const StatsScreen = ({navigation}) => {
  const batting = [
    {
      id: 0,
      title: 'Most Runs',
      value: 'I am Batsman',
    },
    {
      id: 1,
      title: 'Best Batting average',
      value: 'adadadadadad',
    },
    {
      id: uuid.v4(),
      title: 'Best Batting Strike Rate',
      value: 'I am Batsman',
    },
    {
      id: uuid.v4(),
      title: 'Most Hundreds',
      value: 'I am Batsman',
    },
    {
      id: uuid.v4(),
      title: 'Most Fifties',
      value: 'I am Batsman',
    },
    {
      id: uuid.v4(),
      title: 'Most Fours',
      value: 'I am Batsman',
    },
    {
      id: uuid.v4(),
      title: 'Most Sixes',
      value: 'I am Batsman',
    },
    {
      id: uuid.v4(),
      title: 'Highest Score',
      value: 'I am Batsman',
    },
  ];
  const bowling = [
    {
      id: uuid.v4(),
      title: 'Most Wickets',
      value: 'I am Bowler',
    },
    {
      id: uuid.v4(),
      title: 'Best Bowling average',
      value: 'I am Bowler',
    },
    {
      id: uuid.v4(),
      title: 'Most 5 Wickets Hauls',
      value: 'I am Bowler',
    },
    {
      id: uuid.v4(),
      title: 'Best Economy',
      value: 'I am Bowler',
    },
    {
      id: uuid.v4(),
      title: 'Best Bowling Strike Rate',
      value: 'I am Bowler',
    },
    {
      id: uuid.v4(),
      title: 'Best Bowling',
      value: 'I am Bowler',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>Batting</Text>
          {batting.map(item => (
            <ListItem title={item.title} bodyText={item.value} key={item.id} />
          ))}
          <Text style={styles.heading}>Bowling</Text>
          {batting.map(item => (
            <ListItem title={item.title} bodyText={item.value} key={item.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: '#e7e7e7',
    flex: 1,
  },
  heading: {
    height: 40,
    width: '100%',
    color: '#858585',
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 20,
    backgroundColor: 'rgba(217,226,233,0.5)',
    paddingHorizontal: 3,
    padding: 10,
  },
});
