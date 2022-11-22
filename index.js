/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
// import App from './App';
import Main from './Main';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
