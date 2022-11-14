import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import OnBoardingScreenOne from '../screens/onboardingscreens/OnBoardingScreenOne';
import OnBoardingScreenTwo from '../screens/onboardingscreens/OnBoardingScreenTwo';
import OnBoardingScreenThree from '../screens/onboardingscreens/OnBoardingScreenThree';
import HomeScreen from '../screens/HomeScreen';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

const OnBoardingStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoardingScreenOne"
          component={OnBoardingScreenOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoardingScreenTwo"
          component={OnBoardingScreenTwo}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoardingScreenThree"
          component={OnBoardingScreenThree}
          options={{headerShown: false}}
        />
        <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OnBoardingStack;
