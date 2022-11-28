import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';
import SetPasswordScreen from '../screens/SetPasswordScreen';
import RegistrationSuccessScreen from '../screens/RegistrationSuccessScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="RegisterUserScreen"
        component={RegisterUserScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="SetPasswordScreen"
        component={SetPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegistrationSuccessScreen"
        component={RegistrationSuccessScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
