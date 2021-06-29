/**
 * @format
 */

import {AppRegistry} from 'react-native';
import HomeNavigation from './HomeNavigation';
import AppNavigation from './Navigation/AppNavigation';
import Movies from './Screens/Movies';
import TVShow from './Screens/TVShow';
import Search from './Screens/Search';
import {name as appName} from './app.json';
import SplashScreen from './Screens/SplashScreen';

AppRegistry.registerComponent(appName, () => AppNavigation);
