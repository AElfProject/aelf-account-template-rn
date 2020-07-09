/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './app/App';
import {name as appName} from './app.json';
import './app/assets/theme/colors';
import './app/assets/theme/gStyle';
import './app/utils/unit';
import './app/utils/console';
import './app/utils/text';
import './app/i18n';
AppRegistry.registerComponent(appName, () => App);
