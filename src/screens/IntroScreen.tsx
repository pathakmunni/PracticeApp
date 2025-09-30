import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addIntro, editIntro, deleteIntro, Intro } from '../features/introSlice';

const IntroScreen: React.FC = () => {
  const intros = useAppSelector((state) => state.intro.intros);
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    if (editingId) {
      dispatch(editIntro({ id: editingId, name, description }));
      setEditingId(null);
    } else {
      dispatch(addIntro({ name, description }));
    }
    setName('');
    setDescription('');
  };

  const handleEdit = (intro: Intro) => {
    setEditingId(intro.id);
    setName(intro.name);
    setDescription(intro.description);
  };

  const handleDelete = (id: string) => dispatch(deleteIntro(id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Intros App</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <Button title={editingId ? 'Save Edit' : 'Add Intro'} onPress={handleAddOrEdit} />

      <FlatList
        data={intros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
            <View style={styles.buttons}>
              <Button title="Edit" onPress={() => handleEdit(item)} />
              <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
  card: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 6 },
  cardTitle: { fontWeight: 'bold', fontSize: 18 },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
});

export default IntroScreen;
