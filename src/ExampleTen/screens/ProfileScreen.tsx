// src/screens/ProfileScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { RootState } from "../redux/store";
import useFetch from "../api/useFetch";

const ProfileScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { fetchData } = useFetch();

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchData("https://reqres.in/api/users/2");
      setProfile(data.data);
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      {profile ? (
        <>
          <Text>Name: {profile.first_name} {profile.last_name}</Text>
          <Text>Email: {profile.email}</Text>
        </>
      ) : (
        <Text>Loading profile...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
});
