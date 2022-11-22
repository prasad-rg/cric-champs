import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer} from '@react-navigation/native';

import Players from '../screens/teaminfo/Players';
import Stats from '../screens/teaminfo/Stats';
const Tab = createMaterialTopTabNavigator();

export default function TeamInfoTab() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      screenOptions={{
        //   tabBarScrollEnabled: true,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255,255,255,0.5)',
        tabBarStyle: {
          backgroundColor: 'rgba(0, 102, 226, 1)',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          height: 19,
          // color: '#FFFFFF',
          fontFamily: 'Roboto-Medium',
          fontWeight: '500',
          letterSpacing: 0.5,
          lineHeight: 16,
          textAlign: 'center',
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#FFB400',
          borderBottomWidth: 2.5,
          borderRadius: 3.5,
          width: '50%',

          // height:1,
        },
      }}>
      <Tab.Screen name="PLAYERS" component={Players} />
      <Tab.Screen name="STATS" component={Stats} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
