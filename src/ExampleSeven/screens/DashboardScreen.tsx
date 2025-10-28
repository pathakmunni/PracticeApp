import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/AuthSlice';

const DashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Dashboard</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{ padding: 12, backgroundColor: '#0d6efd', marginBottom: 20 }}
      >
        <Text style={{ color: 'white' }}>Go to Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={handleLogout}
        style={{ padding: 12, backgroundColor: 'red' }}
      >
        <Text style={{ color: 'white' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DashboardScreen;
