import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MatchesScreen from '../screens/MatchesScreen';
import TeamsScreen from '../screens/TeamsScreen';
import StandingsScreen from '../screens/StandingsScreen';
import StatsScreen from '../screens/StatsScreen';
import GroundsScreen from '../screens/GroundsScreen';
import UmpiresScreen from '../screens/UmpiresScreen';


const Tab = createMaterialTopTabNavigator();

const ViewTournamentTab = () => {
  return (
  <Tab.Navigator  screenOptions={() => ({
    tabBarActiveTintColor: '#FFFFFF',
    tabBarInactiveTintColor: '#E1E1D9',
    tabBarLabelStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    tabBarIndicatorStyle: {
      borderBottomColor: '#FFA222',
      borderBottomWidth: 4,
      borderRadius: 3.5,
      marginLeft: "15%",
      width: "10%",
    },
  })}>
     <Tab.Screen name="MATCHES" component={MatchesScreen} />
      <Tab.Screen name="TEAMS" component={TeamsScreen} />
      <Tab.Screen name="STANDINGS" component={StandingsScreen} />
      <Tab.Screen name="STATS" component={StatsScreen} />
      <Tab.Screen name="GROUND" component={GroundsScreen} />
      <Tab.Screen name="UMPIRES" component={UmpiresScreen} />
  </Tab.Navigator>
  )
};

export default ViewTournamentTab;

const styles = StyleSheet.create({});
