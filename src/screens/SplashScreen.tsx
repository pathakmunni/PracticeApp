import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTypedSelector } from '../store/store';

const SplashScreen = ({ navigation }: any) => {
  const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    setTimeout(() => {
      if (isAuthenticated) {
        navigation.replace('MainTabs');
      } else {
        navigation.replace('Login');
      }
    }, 1500);
  }, [isAuthenticated]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
      <Text style={{ marginTop: 16 }}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;
