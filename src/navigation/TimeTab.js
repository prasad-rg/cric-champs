import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import StartTime from '../screens/time/StartTime';
import EndTime from '../screens/time/EndTime';
import { setEnd, setStart } from '../redux/MatchSlice';

const TimeTab = props => {
  const Tab = createMaterialTopTabNavigator();
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
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
      <Tab.Screen
        name="START OF PLAY"
        listeners={({navigation, route}) => ({
          tabPress: e => {
            // console.log("props.................................",props?.route?.params)
            dispatch(setStart(true));
            dispatch(setEnd(false));
          },
        })}>
        {() => <StartTime showProps={true} {...props} />}
      </Tab.Screen>
      <Tab.Screen
        name="END OF PLAY"
        listeners={({navigation, route}) => ({
          tabPress: e => {
            dispatch(setStart(false));
            dispatch(setEnd(true));
          },
        })}>
        {() => <EndTime showProps={true} {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default TimeTab;
