import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addProfile } from '../../store/slices/profileSlice';
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function AddUserScreen({ navigation }: any) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();
  const profiles = useSelector((state: RootState) => state.profile.profiles);


  const handleCreateUser = async () => {

  if (!name.trim()) {
    Alert.alert('Please enter your name');
    return;
  }

  if (profiles.length >= 5) {
    Alert.alert('Profile limit reached', 'You can only create up to 5 profiles.');
    return;
  }

  const profile = {
    id: uuidv4(),
    name: name,
    language: 'en',
  };

  const updatedProfiles = [...profiles, profile];

  dispatch(addProfile(profile));

  await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

  navigation.replace('ProfileSelect');
};
// const handleCreateUser = async () => {

//   const profile = {
//     id: uuidv4(),
//     name: name,
//     language: 'en',
//   };

//   const updatedProfiles = [...profiles, profile];

//   dispatch(addProfile(profile));

//   await AsyncStorage.setItem('profiles', JSON.stringify(updatedProfiles));

//   navigation.replace('ProfileSelect');
// };

  // const handleCreateUser = () => {
  //   if (!name.trim()) {
  //     Alert.alert('Please enter your name');
  //     return;
  //   }

  //   const profile = {
  //     id: uuidv4(),
  //     name: name,
  //     language: 'en',
  //   };

  //   dispatch(addProfile(profile));

  //   navigation.replace('Dashboard');
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Profile</Text>

      <TextInput
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 30,
    alignSelf: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#1C0770',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});