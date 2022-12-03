import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import ListItem from '../components/ListItem';

const StatsScreen = ({navigation}) => {
  const batting = [
    {
      id: 0,
      title: 'Most Runs',
      value: ['Strike Rate', 'Carrer Runs', 'Best Economy Rate'],
      variables: ['strikeRate', 'careerRuns', 'bestEconomyRate'],
      query: 'most_runs',
    },
    {
      id: 1,
      title: 'Best Batting average',
      value: ['Strike Rate', 'Best Batting Average', 'Best Economy Rate'],
      variables: ['strikeRate', 'bestBattingAverage', 'bestEconomyRate'],
      query: 'best_batting_average',
    },
    {
      id: uuid.v4(),
      title: 'Best Batting Strike Rate',
      value: ['Strike Rate', 'Best Economy Rate'],
      variables: ['strikeRate', 'bestEconomyRate'],
      query: 'best_batting_strike_rate',
    },
    {
      id: uuid.v4(),
      title: 'Most Hundreds',
      value: ['Strike Rate', 'Career Hundreds', 'Best Economy Rate'],
      variables: ['strikeRate', 'careerHundreds', 'bestEconomyRate'],
      query: 'most_hundreds',
    },
    {
      id: uuid.v4(),
      title: 'Most Fifties',
      value: ['Strike Rate', 'Career Fifties', 'Best Economy Rate'],
      variables: ['strikeRate', 'careerFifties', 'bestEconomyRate'],
      query: 'most_fifties',
    },
    {
      id: uuid.v4(),
      title: 'Most Fours',
      value: ['Strike Rate', 'Best Economy Rate','Fours'],
      variables: ['strikeRate', 'bestEconomyRate','careerFours'],
      query: 'most_fours',
    },
    {
      id: uuid.v4(),
      title: 'Most Sixes',
      value: ['Strike Rate', 'Best Economy Rate','Sixes'],
      variables: ['strikeRate', 'bestEconomyRate','careerSixes'],
      query: 'most_sixes',
    },
    {
      id: uuid.v4(),
      title: 'Highest Score',
      value: ['Strike Rate','Highest Score', 'Best Economy Rate'],
      variables: ['strikeRate','highestScore', 'bestEconomyRate'],
      query: 'highest_score',
    },
  ];
  const bowling = [
    {
      id: uuid.v4(),
      title: 'Most Wickets',
      value: ['Strike Rate','Career Wikets Taken', 'Best Economy Rate'],
      variables: ['strikeRate','careerWicketsTaken', 'bestEconomyRate'],
      query: 'most_wickets',
    },
    {
      id: uuid.v4(),
      title: 'Best Bowling average',
      value: ['Strike Rate','Best Bowling Average', 'Best Economy Rate'],
      variables: ['strikeRate','bestEconomyRate', 'bestEconomyRate'],
      query: 'best_bowling_average',
    },
    {
      id: uuid.v4(),
      title: 'Most 5 Wickets Hauls',
      value: ['Strike Rate','Five Wicket Haul', 'Best Economy Rate'],
      variables: ['strikeRate','fiveWicketHaul', 'bestEconomyRate'],
      query: 'most_5_wickets_hauls',
    },
    {
      id: uuid.v4(),
      title: 'Best Economy',
      value: ['Strike Rate', 'Best Economy Rate'],
      variables: ['strikeRate', 'bestEconomyRate'],
      query: 'best_economy',
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flex: 1}}>
          <Text style={styles.heading}>Batting</Text>
          {batting.map(item => (
            <ListItem
              title={item.title}
              bodyText={item.value}
              key={item.id}
              query={item.query}
              itemObject={item}
            />
          ))}
          <Text style={styles.heading}>Bowling</Text>
          {bowling.map(item => (
            <ListItem
              title={item.title}
              bodyText={item.value}
              key={item.id}
              query={item.query}
              itemObject={item}
            />
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
