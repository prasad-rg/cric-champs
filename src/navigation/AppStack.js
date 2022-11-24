import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
// import UserControls from '../screens/UserControls';
// import LoginScreen from '../screens/LoginScreen';
import CreateTournament from '../screens/CreateTournament';
import CreateTournamentSuccess from '../screens/CreateTournamentSuccess';
import TeamsList from '../screens/TeamsList';
import AddTeam from '../screens/AddTeam';
import AddPlayer from '../screens/AddPlayer';
import OversScreen from '../screens/OversScreen';
import Ground from '../screens/Ground';
import UmpiresList from '../screens/UmpiresList';
import AddGround from '../screens/AddGround';
import AddUmpire from '../screens/AddUmpire';
import DateScreen from '../screens/DateScreen';
import TimeScreen from '../screens/TimeScreen';

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
        <Stack.Screen
          name="AddTeam"
          component={AddTeam}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddPlayer"
          component={AddPlayer}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OversScreen"
          component={OversScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Ground"
          component={Ground}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UmpiresList"
          component={UmpiresList}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="AddGround"
          component={AddGround}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="AddUmpire"
          component={AddUmpire}
          options={{headerShown: false}}
        />
     
         <Stack.Screen
        name="DateScreen"
        component={DateScreen}
        options={{headerShown: false}}
      />

<Stack.Screen
        name="TimeScreen"
        component={TimeScreen}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
</NavigationContainer>
  );
};

export default AppStack;
