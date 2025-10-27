// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet,Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
// import { login } from '../redux/userSlice';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../navigation/AppNavigator';

// type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
//   const [name, setName] = useState('');
//   const dispatch = useDispatch();

//   const handleLogin = () => {
//     if (!name.trim()) return Alert.alert('Enter Name');
//     dispatch(login(name));
//     navigation.replace('Dashboard');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         placeholder="Enter Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
//   input: {
//     width: '80%',
//     borderWidth: 1,
//     marginBottom: 12,
//     padding: 10,
//     borderRadius: 8,
//   },
// });

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../redux/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [loginId, setLoginId] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setError('');
    try {
      const response = await axios.post('https://dummyjson.com/user/login', {
        username: loginId,
        password: password,
        expiresInMins: 60,
      });

      const user = response.data;
      const token = user.accessToken || user.token || '';

      dispatch(setCredentials({ user, token }));
      await AsyncStorage.setItem('token', token);

      navigation.replace('Dashboard');
    } catch (err: any) {
      console.error('Login error:', err.response?.data || err.message);
      setError('Invalid Credentials');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={loginId}
        onChangeText={setLoginId}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10 },
  error: { color: 'red', marginTop: 10 },
});

