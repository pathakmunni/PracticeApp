import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CounterScreen from '../screens/CounterScreen';
import IntroScreen from '../screens/IntroScreen';
import DemoScreen from '../screens/DemoScreen';
import { Colors, Strings } from '../content';

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.secondary,
      }}
    >
      <Tab.Screen
        name={Strings.demo}
        component={DemoScreen}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <Image
        //       source={Images.demo}
        //       style={{
        //         width: 24,
        //         height: 24,
        //         tintColor: focused ? Colors.primary : Colors.secondary,
        //       }}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name={Strings.counter}
        component={CounterScreen}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <Image
        //       source={Images.counter}
        //       style={{
        //         width: 24,
        //         height: 24,
        //         tintColor: focused ? Colors.primary : Colors.secondary,
        //       }}
        //     />
        //   ),
        // }}
      />
      <Tab.Screen
        name={Strings.intro}
        component={IntroScreen}
        // options={{
        //   tabBarIcon: ({ focused }) => (
        //     <Image
        //       source={Images.intro}
        //       style={{
        //         width: 24,
        //         height: 24,
        //         tintColor: focused ? Colors.primary : Colors.secondary,
        //       }}
        //     />
        //   ),
        // }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
