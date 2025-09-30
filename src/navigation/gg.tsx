import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from '../screens/CounterScreen';
import IntroScreen from '../screens/IntroScreen';
import DemoScreen from '../screens/DemoScreen';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export type TabParamList = {
  Counter: undefined;
  Intros: undefined;
  Demo: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: '#1e90ff',
        tabBarInactiveTintColor: '#555',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarIcon: ({ color, size }) => {
          let iconName = 'alert-circle-outline';

          if (route.name === 'Counter') iconName = 'calculator-outline';
          else if (route.name === 'Intros') iconName = 'people-outline';
          else if (route.name === 'Demo') iconName = 'list-outline';

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Counter" component={CounterScreen} />
      <Tab.Screen name="Intros" component={IntroScreen} />
      <Tab.Screen name="Demo" component={DemoScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default BottomTabs;
