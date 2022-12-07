import {View, Text} from 'react-native';
import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Tournament from '../screens/managedetails/Tournament';
import Matches from '../screens/managedetails/Matches';
import CoAdmins from '../screens/managedetails/CoAdmins';

const Tab = createMaterialTopTabNavigator();

export default function ManageTab(props) {
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
          width:"100%",
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          // letterSpacing: 0.5,
          lineHeight: 16,
          // textAlign: 'center',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#FFB400',
          borderBottomWidth: 2.5,
          borderRadius: 3.5,

          // width: '34%',
        },
      }}>
      <Tab.Screen name="TOURNAMENT">
        {() => <Tournament showProps={true} {...props} />}
      </Tab.Screen>
      <Tab.Screen name="MATCHES" component={Matches} />
      <Tab.Screen name="CO-ADMINS" component={CoAdmins} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
