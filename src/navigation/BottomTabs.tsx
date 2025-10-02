// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CounterScreen from '../screens/CounterScreen';
// import IntroScreen from '../screens/IntroScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { Text } from 'react-native';

// export type TabParamList = {
//   Counter: undefined;
//   Intros: undefined;
// };

// const Tab = createBottomTabNavigator<TabParamList>();

// const BottomTabs = () => {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           headerShown: true,
//           tabBarLabelStyle: { fontSize: 14 },
//         }}
//       >
//         <Tab.Screen name="Counter" component={CounterScreen} />
//         <Tab.Screen name="Intros" component={IntroScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// };

// export default BottomTabs;


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CounterScreen from '../screens/CounterScreen';
import IntroScreen from '../screens/IntroScreen';
import DemoScreen from '../screens/DemoScreen';
import { NavigationContainer } from '@react-navigation/native';

export type TabParamList = {
  Counter: undefined;
  Intros: undefined;
  Demo: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const BottomTabs = () => (
  <NavigationContainer>
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Counter" component={CounterScreen} />
      <Tab.Screen name="Intros" component={IntroScreen} />
      <Tab.Screen name="Demo" component={DemoScreen} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default BottomTabs;


{/* <Tab.Navigator
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
    ></Tab.Navigator> */}