import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
//   const { login, token } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
    //   await login(email, password);
      Alert.alert('✅ Login Success');
    } catch {
      Alert.alert('❌ Login Failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
      {token && <Text style={styles.token}>Token: {token}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  token: { marginTop: 10, color: 'green' },
});

export default LoginScreen;
