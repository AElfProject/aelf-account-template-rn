import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home';
import MineScreen from '../Mine';
import {pixelSize} from '../../utils/device';
import i18n from 'i18n-js';
import {SettingsType} from '../../redux/settingsRedux';
import {useSelector} from 'react-redux';
import {Colors} from '../../assets/theme';
const Tab = createBottomTabNavigator();
const TabNavigatorStack = () => {
  useSelector(SettingsType.getLanguage); //Language status is controlled with redux
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
