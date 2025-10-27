import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { RootState } from "../store/store";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const dispatch = useDispatch<any>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigation.replace("Dashboard"))
      .catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capgemini Employee Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <Text style={styles.hint}>Test Credentials:</Text>
      <Text style={styles.creds}>📧 eve.holt@reqres.in</Text>
      <Text style={styles.creds}>🔑 cityslicka</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 30, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 15 },
  button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  error: { color: "red", textAlign: "center", marginTop: 10 },
  hint: { textAlign: "center", marginTop: 20, color: "#555" },
  creds: { textAlign: "center", fontWeight: "600" },
});

export default LoginScreen;
