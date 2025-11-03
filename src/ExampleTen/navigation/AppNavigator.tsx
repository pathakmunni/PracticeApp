// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthScreen from "../screens/AuthScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={AuthScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
  );
}