import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/authSlice';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootState } from '../redux/store';

type Props = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome {user?.firstName} {user?.lastName}</Text>
      <Text>Email: {user?.email}</Text>

      <Button title="View Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default DashboardScreen;
