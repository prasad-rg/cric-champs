import React from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
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
import Overview from '../screens/Overview';
import TeamInfoScreen from '../screens/TeamInfoScreen';
import PlayerProfile from '../screens/PlayerProfile';
import UmpireProfile from '../screens/UmpireProfile';
import StadiumInformation from '../screens/StadiumInformation';
import ManageScreen from '../screens/ManageScreen';
import TimeTab from './TimeTab';
import DateTab from './DateTab';

const Stack = createStackNavigator();

const AppStack = () => {
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
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
         
        }}
      />
      <Stack.Screen
        name="CreateTournamentSuccess"
        component={CreateTournamentSuccess}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="TeamsList"
        component={TeamsList}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="AddTeam"
        component={AddTeam}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="AddPlayer"
        component={AddPlayer}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="OversScreen"
        component={OversScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="Ground"
        component={Ground}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="UmpiresList"
        component={UmpiresList}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="AddGround"
        component={AddGround}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="AddUmpire"
        component={AddUmpire}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />

      <Stack.Screen
        name="DateScreen"
        component={DateScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />

      <Stack.Screen
        name="TimeScreen"
        component={TimeScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="Overview"
        component={Overview}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="TeamInfoScreen"
        component={TeamInfoScreen}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="PlayerProfile"
        component={PlayerProfile}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="UmpireProfile"
        component={UmpireProfile}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="StadiumInformation"
        component={StadiumInformation}
        options={{headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}
      />
      <Stack.Screen
        name="TimeTab"
        component={TimeTab}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DateTab"
        component={DateTab}
        options={{headerShown: false}}
      />

      {/* <Stack.Screen
          name="ManageScreen"
          component={ManageScreen}
          options={{headerShown: false}}
        /> */}
    </Stack.Navigator>
//  </NavigationContainer> 
  );
};

export default AppStack;
