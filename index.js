/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './app/App';
import { name as appName } from './app.json';
import './app/assets/theme/colors'
import './app/utils/unit'
import './app/utils/console'
AppRegistry.registerComponent(appName, () => App);
