import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import UserControls from '../screens/UserControls';
// import LoginScreen from '../screens/LoginScreen';
import CreateTournament from '../screens/CreateTournament';
import CreateTournamentSuccess from '../screens/CreateTournamentSuccess';
import TeamsList from '../screens/TeamsList';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="UserControls"
          component={UserControls}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="CreateTournament"
          component={CreateTournament}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreateTournamentSuccess"
          component={CreateTournamentSuccess}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamsList"
          component={TeamsList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
