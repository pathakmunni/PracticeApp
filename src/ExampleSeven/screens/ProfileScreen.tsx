import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
// @ts-ignore: module has no type declarations
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/AuthSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
    await AsyncStorage.clear();
    dispatch(logout());
    navigation.replace('Login');
  };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      {/* Profile Card */}
      <View style={styles.card}>
        <Image
          source={{
            uri:
              user?.avatar ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.role}>{user?.role || 'User'}</Text>
      </View>

      {/* User Info */}
      <View style={styles.infoBox}>
        <View style={styles.row}>
          <Icon name="email" size={22} color="#555" />
          <Text style={styles.infoText}>{user?.email}</Text>
        </View>

        {user?.mobile && (
          <View style={styles.row}>
            <Icon name="phone" size={22} color="#555" />
            <Text style={styles.infoText}>{user?.mobile}</Text>
          </View>
        )}

        {user?.address && (
          <View style={styles.row}>
            <Icon name="map-marker" size={22} color="#555" />
            <Text style={styles.infoText}>{user?.address}</Text>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn}>
          <Icon name="account-edit" size={20} color="#fff" />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout} style={[styles.btn, styles.logoutBtn]}>
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FF',
  },
  header: {
    backgroundColor: '#4A6CF7',
    height: 160,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -60,
    marginHorizontal: 25,
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 6,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
  },
  role: {
    fontSize: 14,
    color: '#777',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 18,
    marginHorizontal: 25,
    marginTop: 25,
    borderRadius: 15,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttons: {
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 25,
    gap: 12,
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#4A6CF7',
    paddingVertical: 14,
    borderRadius: 15,
  },
  logoutBtn: {
    backgroundColor: '#FF4B55',
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

