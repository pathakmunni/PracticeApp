import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import { useDispatch, useSelector } from "react-redux";
import { loadToken } from "./store/authSlice";
import { RootState } from "./store/store";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch<any>();
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(loadToken());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
