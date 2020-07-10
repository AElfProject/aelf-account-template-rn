import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Referral from '../template/Referral';

import Tab from './Tab';
import navigationService from '../../utils/common/navigationService';

import LoginNav from '../template/Login/stackNav';
import MineNav from '../template/Mine/stackNav';
const Stack = createStackNavigator();

const stackNav = [
  {name: 'Referral', component: Referral},
  {name: 'Tab', component: Tab},
  ...LoginNav,
  ...MineNav,
];
const NavigationMain = () => (
  <NavigationContainer ref={navigationService.setTopLevelNavigator}>
    <Stack.Navigator
      initialRouteName="Referral"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        header: () => null,
      }}>
      {stackNav.map((item, index) => (
        <Stack.Screen key={index} {...item} />
      ))}
    </Stack.Navigator>
  </NavigationContainer>
);
export default NavigationMain;
