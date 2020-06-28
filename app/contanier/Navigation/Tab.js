import React from "react"
import Icon from 'react-native-vector-icons/AntDesign';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Home'
import MineScreen from "../Mine";
import { pixelSize } from "../../utils/device";
const Tab = createBottomTabNavigator();

const tabNav = [
    {
        name: 'HomePage', component: HomeScreen, options: {
            tabBarLabel: "HOME",
            tabBarIcon: ({ color }) => (
                <Icon name="home" size={20} color={color} />
            )
        },
    },
    {
        name: 'MinePage', component: MineScreen, options: {
            tabBarLabel: "MY",
            tabBarIcon: ({ color }) => (
                <Icon name="user" size={20} color={color} />
            )
        },
    },
]
const TabNavigatorStack = () => (
    <Tab.Navigator
        initialRouteName='HomeScreen'
        lazy={false}
        tabBarOptions={{
            activeTintColor: Colors.fontColor,
            inactiveTintColor: Colors.fontBlack,
            style: {
                borderTopColor: "#ececec",
                borderWidth: pixelSize
            },
            keyboardHidesTabBar: true    //hide tab
        }}>
        {
            tabNav.map((item, index) => {
                return (
                    <Tab.Screen key={index} {...item} />
                )
            })
        }
    </Tab.Navigator>
);

export default TabNavigatorStack
