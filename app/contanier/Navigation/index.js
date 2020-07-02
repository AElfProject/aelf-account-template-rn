import React from "react";
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Referreal from '../Referreal';

import Tab from './Tab';
import navigationService from '../../utils/navigationService';

import LoginNav from '../Login/stackNav'
const Stack = createStackNavigator();

const stackNav = [
    { name: 'Referreal', component: Referreal },
    { name: 'Tab', component: Tab },
    ...LoginNav,
];
const NavigationMain = () => (
    <NavigationContainer ref={navigationService.setTopLevelNavigator}>
        <Stack.Navigator
            initialRouteName='Referreal'
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                header: () => null,
            }}>
            {
                stackNav.map((item, index) => (
                    <Stack.Screen key={index} {...item} />
                ))
            }
        </Stack.Navigator>
    </NavigationContainer >
);
export default NavigationMain