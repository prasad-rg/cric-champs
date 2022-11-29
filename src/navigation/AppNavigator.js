import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
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
import Overview from '../screens/Overview';
import TeamInfoScreen from '../screens/TeamInfoScreen';
import PlayerProfile from '../screens/PlayerProfile';
import UmpireProfile from '../screens/UmpireProfile';
import StadiumInformation from '../screens/StadiumInformation';
import ManageScreen from '../screens/ManageScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    // <NavigationContainer>
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
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{headerShown: false}}
      />
       <Stack.Screen
          name="TeamInfoScreen"
          component={TeamInfoScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PlayerProfile"
          component={PlayerProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UmpireProfile"
          component={UmpireProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StadiumInformation"
          component={StadiumInformation}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Overview"
          component={Overview}
          options={{headerShown: false}}
        />
    </Stack.Navigator>
    //  </NavigationContainer>
  );
};

export default AppNavigator;