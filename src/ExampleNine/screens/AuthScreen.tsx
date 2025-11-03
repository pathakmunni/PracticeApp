import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, logout } from "../redux/authSlice";
import { RootState } from "../redux/store";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(false);
  // ✅ Example API call for login
  const handleLogin = async () => {
    try {
      setLoading(true);
      // Replace this with your real API endpoint
      const response = await axios.post("https://reqres.in/api/login", {
        email: "eve.holt@reqres.in",
        password: "cityslicka",
      });
      // In real API, you’ll get token/user info — here we fake it
      if (response.status === 200) {
        const userData = {
          name: "Munni",
          email: "eve.holt@reqres.in",
          token: response.data.token,
        };
        dispatch(login(userData));
      }
    } catch (error: any) {
      console.log("Login error:", error?.response?.data || error.message);
      Alert.alert("Login Failed", error?.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.text}>Welcome, {user.name} 👋</Text>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Button title="Logout" onPress={handleLogout} />
        </>
      ) : loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <>
          <Text style={styles.text}>You are logged out</Text>
          <Button title="Login (API)" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 10 },
});

export default AuthScreen;
