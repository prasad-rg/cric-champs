import React from 'react';

import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';

import OnBoardingScreenOne from '../screens/onboardingscreens/OnBoardingScreenOne';
import OnBoardingScreenTwo from '../screens/onboardingscreens/OnBoardingScreenTwo';
import OnBoardingScreenThree from '../screens/onboardingscreens/OnBoardingScreenThree';
import HomeScreen from '../screens/HomeScreen';
import {Text, View} from 'react-native';
import UserControl from '../screens/UserControl';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="UserControls"
        component={UserControl}
        options={{
          headerShown: false,
          gestureDirection: 'horizontal-inverted',
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default HomeStack;
