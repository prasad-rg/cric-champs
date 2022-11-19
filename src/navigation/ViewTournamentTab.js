import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MatchesScreen from '../screens/MatchesScreen';
import TeamsScreen from '../screens/TeamsScreen';
import StandingsScreen from '../screens/StandingsScreen';
import StatsScreen from '../screens/StatsScreen';
import GroundsScreen from '../screens/GroundsScreen';
import UmpiresScreen from '../screens/UmpiresScreen';

const Tab = createMaterialTopTabNavigator();

const ViewTournamentTab = () => {
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
          tabBarStyle: {
            backgroundColor: 'rgba(0, 102, 226, 0.9)',
            width: '100%',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            height: 19,
            // color: '#FFFFFF',
            fontFamily: 'Roboto-Medium',
            fontWeight: '500',
            letterSpacing: 0.5,
            lineHeight: 16,
            // textAlign: 'center',
          },
          tabBarIndicatorStyle: {
            borderBottomColor: '#FFB400',
            borderBottomWidth: 2.5,
            borderRadius: 3.5,
            marginLeft: '3%',
            width: '8%',
            // height:1,
          },
        }}
   
      >
        <Tab.Screen name="MATCHES" component={MatchesScreen} />
        <Tab.Screen name="TEAMS" component={TeamsScreen} />
        <Tab.Screen name="STANDINGS" component={StandingsScreen} />
        <Tab.Screen name="STATS" component={StatsScreen} />
        <Tab.Screen name="GROUNDS" component={GroundsScreen} />
        <Tab.Screen name="UMPIRES" component={UmpiresScreen} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default ViewTournamentTab;

const styles = StyleSheet.create({});

//  options={{headerShown: false}}
