import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingStack from './OnBoardingStack';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import ViewTournamentTab from './ViewTournamentTab';
import ViewScreen from '../screens/ViewScreen';
import {useSelector} from 'react-redux';
import AppStack from './AppStack';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isLoggedIn, isInitialAppLaunch} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isInitialAppLaunch && (
          <Stack.Screen
            name="OnBoardingStack"
            component={OnBoardingStack}
            options={{headerShown: false}}
          />
        )}
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{headerShown: false}}
        />
       
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}
          />
        
        <Stack.Screen
          name="ViewScreen"
          component={ViewScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
