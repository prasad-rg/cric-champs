import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import StartDate from '../screens/dates/StartDate';
import EndDate from '../screens/dates/EndDate';

const DateTab = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    // <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
          tabBarStyle: {
            backgroundColor: 'rgba(0, 102, 226, 1)',
          },
          tabBarLabelStyle: {
            fontSize: 14,
            height: 19,
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
            width: '50%',
          },
        }}>
        <Tab.Screen name="START DATE" component={StartDate} />
        <Tab.Screen name="END DATE" component={EndDate} />
      </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default DateTab;
