import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>

      {user?.image && <Image source={{ uri: user.image }} style={styles.avatar} />}

      <Text style={styles.text}>Name: {user?.firstName} {user?.lastName}</Text>
      <Text style={styles.text}>Email: {user?.email}</Text>
      <Text style={styles.text}>Phone: {user?.phone}</Text>
      <Text style={styles.text}>Country: {user?.address?.country}</Text>
      <Text style={styles.text}>Gender: {user?.gender}</Text>

      <Button title="Back to Dashboard" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
  },
});
