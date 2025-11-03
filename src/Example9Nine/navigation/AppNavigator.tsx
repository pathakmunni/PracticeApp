import { createNativeStackNavigator } from "@react-navigation/native-stack";
import{ useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthScreen from "../screens/AuthScreen";
import LoginScreen from "../screens/LoginScreen";
import NetworkInfoExm from "../screens/NetworkInfoExm";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState("Auth");

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuthStatus = async () => {
      // Here you would typically check async storage or make an API call
      const isAuthenticated = false; // Replace with real auth check
      if (isAuthenticated) {
        setInitialRoute("Login");
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={'Login'}>
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="NetworkInfoExm" component={NetworkInfoExm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;