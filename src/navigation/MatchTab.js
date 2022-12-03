import {View, Text} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import InfoScreen from '../screens/matchdetails/InfoScreen';
import LiveScreen from '../screens/matchdetails/LiveScreen';
import ScoreboardScreen from '../screens/matchdetails/ScoreboardScreen';
import Graph from '../screens/matchdetails/Graph';

const Tab = createMaterialTopTabNavigator();

export default function MatchTab(props) {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        //   tabBarScrollEnabled: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 102, 226, 1)',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          height: 19,
          width:100,
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          letterSpacing: 0.5,
          lineHeight: 16,
          textAlign: 'center',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#FFB400',
          borderBottomWidth: 2.5,
          borderRadius: 3.5,
          width: '25%',
        },
      }}>
      <Tab.Screen name="INFO">{() => <InfoScreen {...props} />}</Tab.Screen>
      <Tab.Screen name="LIVE">{() => <LiveScreen {...props} />}</Tab.Screen>
      <Tab.Screen name="SCOREBOARD">{() => <ScoreboardScreen {...props} />}</Tab.Screen>
      <Tab.Screen name="GRAPH">{() => <Graph {...props} />}</Tab.Screen>
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
