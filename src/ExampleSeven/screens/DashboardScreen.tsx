import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../redux/AuthSlice';
import { RootState } from '../redux/store';
// @ts-ignore: no declaration file for react-native-vector-icons/MaterialCommunityIcons
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const foodCategories = [
  { id: '1', title: 'Pizza', icon: 'pizza', bg: '#FFE6D4' },
  { id: '2', title: 'Burger', icon: 'hamburger', bg: '#FFD6E8' },
  { id: '3', title: 'Drinks', icon: 'cup', bg: '#D3F4FF' },
  { id: '4', title: 'Sweets', icon: 'cookie', bg: '#E6FFD4' },
];

const DashboardScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
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
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.username}>{user?.firstName} 👋</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{
            uri:
              user?.avatar ||
              'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Delicious food at your doorstep</Text>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/5787/5787016.png',
          }}
          style={styles.bannerImage}
        />
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories 🍽️</Text>

      <FlatList
        data={foodCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.categoryCard, { backgroundColor: item.bg }]}>
            <Icon name={item.icon} size={30} color="#333" />
            <Text style={styles.categoryText}>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 10 }}
      />

      {/* Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.profileBtn}
      >
        <Icon name="account-circle" size={20} color="#fff" />
        <Text style={styles.btnText}>Go to Profile</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
  },
  greeting: {
    fontSize: 16,
    color: '#777',
  },
  username: {
    fontSize: 26,
    fontWeight: '700',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  banner: {
    marginTop: 25,
    backgroundColor: '#4A6CF7',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
  },
  bannerText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  bannerImage: {
    width: 80,
    height: 80,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 25,
  },
  categoryCard: {
    width: 100,
    height: 100,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  profileBtn: {
    backgroundColor: '#4A6CF7',
    marginTop: 35,
    paddingVertical: 14,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  logoutBtn: {
    backgroundColor: '#FF4B55',
    marginTop: 15,
    paddingVertical: 14,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 40,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
