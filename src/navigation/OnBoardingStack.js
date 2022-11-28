import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import OnBoardingScreenOne from '../screens/onboardingscreens/OnBoardingScreenOne';
import OnBoardingScreenTwo from '../screens/onboardingscreens/OnBoardingScreenTwo';
import OnBoardingScreenThree from '../screens/onboardingscreens/OnBoardingScreenThree';
import HomeScreen from '../screens/HomeScreen';
import {Text, View} from 'react-native';

const Stack = createStackNavigator();

const OnBoardingStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoardingScreenOne"
        component={OnBoardingScreenOne}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="OnBoardingScreenTwo"
        component={OnBoardingScreenTwo}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="OnBoardingScreenThree"
        component={OnBoardingScreenThree}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default OnBoardingStack;
