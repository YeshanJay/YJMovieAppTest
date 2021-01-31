/**
 * @format
 */

// import 'react-native-gesture-handler';
import { AppRegistry, Platform, UIManager } from 'react-native';
import App from './src/index';
import { name as appName } from './app.json';


UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
AppRegistry.registerComponent(appName, () => App);
