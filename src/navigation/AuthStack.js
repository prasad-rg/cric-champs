import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import RegistrationSuccessScreen from '../screens/RegistrationSuccessScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterUserScreen"
          component={RegisterUserScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SetPasswordScreen"
          component={SetPasswordScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegistrationSuccessScreen"
          component={RegistrationSuccessScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
