import React, {useState} from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardingStack from './OnBoardingStack';
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import HomeStack from './HomeStack';
import ViewTournamentTab from './ViewTournamentTab';
import ViewScreen from '../screens/ViewScreen';
import {useSelector} from 'react-redux';
import TeamInfoScreen from '../screens/TeamInfoScreen';
import PlayerProfile from '../screens/PlayerProfile';
import StadiumInformation from '../screens/StadiumInformation';
import ManageScreen from '../screens/ManageScreen';
import UmpireProfile from '../screens/UmpireProfile';
import AppNavigator from './AppNavigator';
import TeamsList from '../screens/TeamsList';
import Ground from '../screens/Ground';
import OversScreen from '../screens/OversScreen';
import UmpiresList from '../screens/UmpiresList';
import DateScreen from '../screens/DateScreen';
import TimeScreen from '../screens/TimeScreen';
import AddTeam from '../screens/AddTeam';
import AddPlayer from '../screens/AddPlayer';
import MatchDetails from '../screens/MatchDetails';
import AddGround from '../screens/AddGround';
import AddUmpire from '../screens/AddUmpire';
import ManageTournament from '../screens/ManageTournament';
import RNBootSplash from 'react-native-bootsplash';


const Stack = createStackNavigator();

const RootNavigator = () => {
  const {isLoggedIn, isInitialAppLaunch} = useSelector(state => state.auth);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      <Stack.Navigator>
        {isInitialAppLaunch && (
          <Stack.Screen
            name="OnBoardingStack"
            component={OnBoardingStack}
            options={{
              headerShown: false,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
          />
        )}
        <Stack.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
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
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="AppStack"
          component={AppStack}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="TeamInfoScreen"
          component={TeamInfoScreen}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="PlayerProfile"
          component={PlayerProfile}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="UmpireProfile"
          component={UmpireProfile}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="StadiumInformation"
          component={StadiumInformation}
          options={{
            headerShown: false,
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          }}
        />
        <Stack.Screen
          name="ManageScreen"
          component={ManageScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TeamsList"
          component={TeamsList}
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
          name="AddGround"
          component={AddGround}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MatchDetails"
          component={MatchDetails}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageTournament"
          component={ManageTournament}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddUmpire"
          component={AddUmpire}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
