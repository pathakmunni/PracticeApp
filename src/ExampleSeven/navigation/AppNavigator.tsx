import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState } from '../redux/store';
import { loginSuccess, finishLoading } from '../redux/AuthSlice';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FoodListScreen from '../screens/FoodListScreen';
import CartScreen from '../screens/CartScreen';
import IncidentTreeScreen from '../screens/IncidentTreeScreen';
import TreeScreen from '../screens/TreeScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const { token, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const savedToken = await AsyncStorage.getItem('token');
        const savedUser = await AsyncStorage.getItem('user');
        if (savedToken && savedUser) {
          dispatch(
            loginSuccess({ token: savedToken, user: JSON.parse(savedUser) }),
          );
        } else {
          dispatch(finishLoading());
        }
      } catch (e) {
        dispatch(finishLoading());
      }
    };
    checkLogin();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="FoodList" component={FoodListScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
            <Stack.Screen name="IncidentTree" component={IncidentTreeScreen} />
            <Stack.Screen name="Tree" component={TreeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
