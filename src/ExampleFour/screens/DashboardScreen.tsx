import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import api from "../api/apiClient";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";

const DashboardScreen = ({ navigation }: any) => {
  const [employees, setEmployees] = useState<any[]>([]);
  const dispatch = useDispatch<any>();

  const fetchEmployees = async () => {
    const res = await api.get("/users?page=1");
    setEmployees(res.data.data);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigation.replace("Login");
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👩‍💼 Employee Dashboard</Text>
      <FlatList
        data={employees}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.first_name} {item.last_name}</Text>
              <Text style={styles.role}>{item.email}</Text>
            </View>
          </View>
        )}
      />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "600" },
  role: { fontSize: 14, color: "#777" },
  logoutBtn: {
    backgroundColor: "#FF3B30",
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  logoutText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});

export default DashboardScreen;
