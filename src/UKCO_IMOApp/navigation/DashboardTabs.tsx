// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import SettingsScreen from '../screens/SettingsScreen';

// const Tab = createBottomTabNavigator();

// export default function DashboardTabs() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
      
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//       />

//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//       />

//       <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//       />

//     </Tab.Navigator>
//   );
// }


import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../features/course/screens/HomeScreen';
import ProfileScreen from '../features/profile/screens/ProfileScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function DashboardTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}


// import React from 'react';
// import { View, Text } from 'react-native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Tab = createBottomTabNavigator();

// function TestScreen(){
//   return (
//     <View>
//       <Text>Test Screen</Text>
//     </View>
//   );
// }

// export default function DashboardTabs(){
//   return (
//     <Tab.Navigator>
//   <Tab.Screen name="Test" component={TestScreen} />
// </Tab.Navigator>
//   );
// }