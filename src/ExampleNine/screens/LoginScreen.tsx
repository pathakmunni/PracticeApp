import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { RootState } from "../redux/store";

const LoginScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogin = () => {
    const fakeUser = { name: "Munni", email: "munni@example.com" };
    dispatch(login(fakeUser));
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
      ) : (
        <>
          <Text style={styles.text}>You are logged out</Text>
          <Button title="Login" onPress={handleLogin} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18, marginBottom: 10 },
});

export default LoginScreen;
