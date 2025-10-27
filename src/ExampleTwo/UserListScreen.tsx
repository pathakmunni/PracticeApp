import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Modal,
  Image,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const UserListScreen = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = useCallback(async (pageNumber = 1, refresh = false) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`,
      );
      const data = response.data.data;
      setUsers(prev => (refresh ? data : [...prev, ...data]));
      setError(null);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchUsers(1, true);
  };

  const loadMore = () => {
    if (!loading) setPage(prev => prev + 1);
  };

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity style={styles.card} onPress={() => setSelectedUser(item)}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <Text style={styles.name}>
        {item.first_name} {item.last_name}
      </Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" /> : null
        }
      />

      <Modal visible={!!selectedUser} transparent animationType="slide">
        <View style={styles.modal}>
          {selectedUser && (
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedUser.avatar }}
                style={styles.modalAvatar}
              />
              <Text style={styles.modalName}>
                {selectedUser.first_name} {selectedUser.last_name}
              </Text>
              <Text style={styles.modalEmail}>{selectedUser.email}</Text>
              <TouchableOpacity onPress={() => setSelectedUser(null)}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  name: { fontSize: 16, fontWeight: '600' },
  email: { fontSize: 13, color: '#555' },
  error: { color: 'red', textAlign: 'center', marginBottom: 10 },
  modal: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  modalName: { fontSize: 18, fontWeight: '700' },
  modalEmail: { color: '#555', marginBottom: 10 },
  close: { color: 'blue', marginTop: 10 },
});

export default UserListScreen;
