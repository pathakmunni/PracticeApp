import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginSuccess } from '../redux/AuthSlice';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
// @ts-ignore: module has no type declarations
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [email, setEmail] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [secure, setSecure] = useState(true);
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
    <View style={styles.main}>
      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2769/2769603.png',
        }}
        style={styles.topImage}
      />

      <View style={styles.card}>
        <Text style={styles.title}>Welcome 👋</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        {error !== '' && <Text style={styles.error}>{error}</Text>}

        {/* Username */}
        <View style={styles.inputWrapper}>
          <Icon name="account" size={22} color="#444" />
          <TextInput
            placeholder="Username"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Icon name="lock" size={22} color="#444" />
          <TextInput
            placeholder="Password"
            secureTextEntry={secure}
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            <Icon name={secure ? 'eye-off' : 'eye'} size={22} color="#444" />
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.loginButton}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#4A6CF7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImage: {
    width: 160,
    height: 160,
    marginBottom: -50,
  },
  card: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#777',
    marginBottom: 25,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.2,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  loginButton: {
    backgroundColor: '#4A6CF7',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});

// Test Credentials for DummyJSON API
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

// {
//   "email": "emilys",
//   "password": "emilyspass"
// }