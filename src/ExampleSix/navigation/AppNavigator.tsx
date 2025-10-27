import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { RootState } from '../redux/store';

export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Login');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await axios.get('https://dummyjson.com/user/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setCredentials({ user: res.data, token }));
          setInitialRoute('Dashboard');
        }
      } catch (error) {
        console.log('Auto-login failed', error);
      } finally {
        setChecking(false);
      }
    };
    checkToken();
  }, [dispatch]);

  if (checking) return null; // or splash

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;




// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from '../screens/LoginScreen';
// import DashboardScreen from '../screens/DashboardScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// export type RootStackParamList = {
//   Login: undefined;
//   Dashboard: undefined;
//   Profile: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Dashboard" component={DashboardScreen} />
//       <Stack.Screen name="Profile" component={ProfileScreen} />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;
