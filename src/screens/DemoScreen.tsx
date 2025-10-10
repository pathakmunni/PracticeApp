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
import { logout } from '../features/authSlice';
import { useNavigation } from '@react-navigation/native';

const DemoScreen: React.FC = () => {
  const { items, loadItems, selectItem } = useDemo();
  const selected = useTypedSelector(state => state.demo.selectedItem);
  const dispatch = useTypedDispatch();
  const user = useTypedSelector(state => state.auth.user);
  const navigation = useNavigation();

  useEffect(() => {
    loadItems();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // 👈 go back to Login screen
    });
  };

  const handleGoToInterview = () => {
    // 👇 navigate to InterviewQuestionScreen
    navigation.navigate('InterviewQuestion' as never);
  };

  const handleGoToOptimizedList = () => { navigation.navigate('OptimizedList' as never); };

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

      <View style={styles.bottomContainer}>
        {user ? (
          <Text style={{ marginBottom: 10 }}>Welcome {user.email}</Text>
        ) : (
          <Text style={{ marginBottom: 10 }}>You are logged out</Text>
        )}

        {/* ✅ Navigate to InterviewQuestionScreen */}
        <Button
          title="Go to Interview Questions"
          onPress={handleGoToInterview}
        />
        <Button
          title="OptimizedList"
          onPress={handleGoToOptimizedList}
        />

        <View style={{ marginTop: 10 }}>
          <Button title="Logout" color="red" onPress={handleLogout} />
        </View>
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
  bottomContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
