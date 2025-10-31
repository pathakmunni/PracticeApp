// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
// import DashboardScreen from '../screens/DashboardScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();

// const BottomTab = () => {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false,  
//         tabBarAccessibilityLabel: 'Bottom Tab Navigation',      
//         tabBarActiveTintColor: 'blue',
//         tabBarInactiveTintColor: 'gray',
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarStyle: { height: 60 },
//     }}>
//       <Tab.Screen name="Dashboard" component={DashboardScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   )
// }

// export default BottomTab


import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardScreen from "../screens/DashboardScreen";
import ProfileScreen from "../screens/ProfileScreen";
import OptimizedFlatList from "../screens/OptimizedFlatList";
// @ts-ignore: Could not find declaration file for module 'react-native-vector-icons/MaterialCommunityIcons'
// const MaterialCommunityIcons: any = require("react-native-vector-icons/MaterialCommunityIcons");
import { View } from "react-native";
// @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#ffffff",
          borderRadius: 20,
          height: 70,
          elevation: 10,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
      }}
    >
      {/* Dashboard */}
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                backgroundColor: focused ? "#ff7f50" : "transparent",
                padding: 2,
                borderRadius: 10,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
                alignContent: "center",
              }}
            >
              <Icon
                name="food"
                size={28}
                color={focused ? "#fff" : "#555"}
              />
            </View>
          ),
        }}
      />
      {/* Optimized FlatList */}
      <Tab.Screen
        name="OptimizedFlatList"
        component={OptimizedFlatList}
        options={{
          tabBarIcon: ({ focused }) => (
             <View
              style={{
                backgroundColor: focused ? "#ff7f50" : "transparent",
                padding: 2,
                borderRadius: 10,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
                alignContent: "center",
              }}
            >
              <Icon
                name="list-status"
                size={28}
                color={focused ? "#fff" : "#555"}
              />
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
             <View
              style={{
                backgroundColor: focused ? "#ff7f50" : "transparent",
                padding: 2,
                borderRadius: 10,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 25,
                alignContent: "center",
              }}
            >
              <Icon
                name="account-circle"
                size={28}
                color={focused ? "#fff" : "#555"}
              />
            </View>
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default BottomTab;
