import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import { loginSuccess, loginFailure } from '../features/authSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('test@test.com');
  const [password, setPassword] = useState('1234');
  const [loading, setLoading] = useState(false);

  const dispatch = useTypedDispatch();
  const error = useTypedSelector(state => state.auth.error);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Dummy API call
      const res = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        email,
        password,
      });

      // Fake credential check
      if (email === 'test@test.com' && password === '1234') {
        dispatch(loginSuccess({ email }));
        navigation.replace('MainTabs'); // ✅ go to home
      } else {
        dispatch(loginFailure('Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure('Something went wrong!'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  error: { color: 'red', marginBottom: 12, textAlign: 'center' },
});






// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';

// const LoginScreen: React.FC = () => {
//   const navigation = useNavigation<any>();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }
//     try {
//       setLoading(true);
//       // Dummy login API (reqres.in is a free dummy auth API)
//       const res = await axios.post('https://reqres.in/api/login', {
//         email,
//         password,
//       });

//       console.log('Login Success:', res.data);

//       Alert.alert('Success', 'Login successful!');

//       // Navigate to Tabs after login
//       navigation.replace('MainTabs');
//     } catch (err: any) {
//       console.log(err);
//       Alert.alert('Login Failed', 'Invalid credentials');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>

//       <TextInput
//         placeholder="Email"
//         style={styles.input}
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />

//       <TextInput
//         placeholder="Password"
//         style={styles.input}
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />

//       <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, marginBottom: 12 },
// });
