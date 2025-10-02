import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from 'react-native';
import useDemo from '../hooks/useDemo';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import { RootState } from '../store/store';
const DemoScreen: React.FC = () => {
  const { items, loadItems, selectItem } = useDemo();
  const selected = useTypedSelector(state => state.demo.selectedItem);

  const dispatch = useTypedDispatch();
  const user = useTypedSelector(state => state.auth.user);
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demo Items</Text>

      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selected?.id === item.id;
          return (
            <TouchableOpacity
              style={[styles.card, isSelected && styles.selectedCard]}
              onPress={() => selectItem(item)}
            >
              <Text
                style={[styles.cardText, isSelected && styles.selectedText]}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={<Text>No items to show</Text>}
      />

      {selected && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Selected: {selected.title}</Text>
        </View>
      )}

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {user ? (
          <Text>Welcome {user.email}</Text>
        ) : (
          <Text>You are logged out</Text>
        )}
        <Button title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </View>
  );
};

export default DemoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#fafafa',
  },
  selectedCard: {
    borderColor: '#1e90ff',
    backgroundColor: '#eaf3ff',
  },
  cardText: { fontSize: 16 },
  selectedText: { fontWeight: '600', color: '#1e90ff' },
  footer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#1e90ff',
    borderRadius: 8,
  },
  footerText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
});
