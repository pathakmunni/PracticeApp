import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/AuthSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [email, setEmail] = useState('emilys'); //test@gmail.com //9876543210 //emilys
  const [password, setPassword] = useState('emilyspass'); //123456 //emilyspass
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'https://dummyjson.com/user/login', // changed endpoint
        {
          username: email,
          password: password,
          expiresInMins: 60,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      console.log('LOGIN SUCCESS:', response.data);
      const data = response.data;

      const token = data.accessToken || data.token;
      if (token) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(data));

        dispatch(loginSuccess({ token: token, user: data }));
        navigation.replace('Dashboard');
      } else {
        console.log('No token in response:', data);
        setError('Invalid Credentials');
      }
    } catch (err: any) {
      console.log('LOGIN ERROR:', err.response?.status, err.response?.data);
      setError('Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 20 }}>
        Login
      </Text>

      {error !== '' && (
        <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
      )}

      <TextInput
        placeholder="Username"
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: 'black',
          padding: 12,
          alignItems: 'center',
          borderRadius: 8,
        }}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

// Username: kminchelle
// Password: 0lelplR

// {
//   "email": "test@gmail.com",
//   "password": "123456"
// }

// {
//   "mobile": "9876543210",
//   "password": "123456"
// }
