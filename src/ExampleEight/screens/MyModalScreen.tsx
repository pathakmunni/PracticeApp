import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const MyModalScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Navigation Modal Screen 🚀</Text>

      <Text style={styles.subtitle}>
        You can add any content here like forms, filters, etc.
      </Text>

      <Button title="Close Modal" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default MyModalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
