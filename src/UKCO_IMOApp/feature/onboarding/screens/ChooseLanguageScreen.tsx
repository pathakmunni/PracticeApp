import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChooseLanguageScreen({ navigation }: any) {
  const handleLanguageSelect = (lang: string) => {
    console.log('Selected Language:', lang);
    navigation.navigate('AddUser');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Language</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguageSelect('en')}
      >
        <Text style={styles.buttonText}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLanguageSelect('ar')}
      >
        <Text style={styles.buttonText}>Arabic</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 40,
  },

  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#1C0770',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});