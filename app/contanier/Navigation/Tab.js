import React, {useEffect, useCallback} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../template/Home';
import MineScreen from '../template/Mine';
import {pixelSize} from '../../utils/common/device';
import i18n from 'i18n-js';
import {settingsSelectors} from '../../redux/settingsRedux';
import {useSelector, shallowEqual} from 'react-redux';
import {Colors} from '../../assets/theme';
import {AppState} from 'react-native';
import navigationService from '../../utils/common/navigationService';
import config from '../../config';
const {SafeTime} = config;
let timer = null;
const Tab = createBottomTabNavigator();
const TabNavigatorStack = () => {
  const securityLock = useSelector(
    settingsSelectors.getSecurityLock,
    shallowEqual,
  );
  const appStateChange = useCallback(
    appState => {
      if (securityLock && SafeTime) {
        if (
          appState === 'active' &&
          timer &&
          new Date().getTime() > timer + SafeTime
        ) {
          timer = null;
          navigationService.navigate('SecurityLock');
        }
        if (appState === 'background') {
          timer = new Date().getTime();
        }
      }
    },
    [securityLock],
  );
  useEffect(() => {
    AppState.addEventListener('change', appStateChange);
    return () => {
      AppState.removeEventListener('change', appStateChange);
    };
  }, [appStateChange]);
  useSelector(settingsSelectors.getLanguage, shallowEqual); //Language status is controlled with redux
  return (
    <Tab.Navigator
      initialRouteName="HomePage"
      lazy={false}
      tabBarOptions={{
        activeTintColor: Colors.fontColor,
        inactiveTintColor: Colors.fontBlack,
        style: {
          borderTopColor: '#ececec',
          borderWidth: pixelSize,
        },
        keyboardHidesTabBar: true, //hide tab
      }}>
      <Tab.Screen
        name="HomePage"
        component={HomeScreen}
        options={{
          tabBarLabel: i18n.t('home'),
          tabBarIcon: ({color}) => <Icon name="home" size={20} color={color} />,
        }}
      />
      <Tab.Screen
        name="MinePage"
        component={MineScreen}
        options={{
          tabBarLabel: i18n.t('mine'),
          tabBarIcon: ({color}) => <Icon name="user" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigatorStack;
