import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import { addIntro, deleteIntro } from '../features/introSlice';

const IntroScreen = () => {
  const [newIntro, setNewIntro] = useState('');
  const intros = useTypedSelector((state) => state.intro.intros);
  const dispatch = useTypedDispatch();

  const handleAddIntro = () => {
    if (newIntro.trim()) {
      dispatch(addIntro({ id: Date.now(), title: newIntro }));
      setNewIntro('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Intro Cards</Text>

      <View style={styles.inputRow}>
        <TextInput
          value={newIntro}
          onChangeText={setNewIntro}
          placeholder="Enter intro text"
          style={styles.input}
        />
        <TouchableOpacity style={styles.addBtn} onPress={handleAddIntro}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={intros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
            <TouchableOpacity onPress={() => dispatch(deleteIntro(item.id))}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>No intros yet...</Text>}
      />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 16 },
  inputRow: { flexDirection: 'row', marginBottom: 16 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  addBtn: {
    backgroundColor: '#1e90ff',
    paddingHorizontal: 16,
    marginLeft: 8,
    justifyContent: 'center',
    borderRadius: 8,
  },
  addBtnText: { color: '#fff', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  cardText: { fontSize: 16, flex: 1 },
  deleteText: { color: '#f44336', fontWeight: '600' },
});


// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { addIntro, editIntro, deleteIntro, Intro } from '../features/introSlice';

// const IntroScreen: React.FC = () => {
//   const intros = useAppSelector((state) => state.intro.intros);
//   const dispatch = useAppDispatch();

//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [editingId, setEditingId] = useState<string | null>(null);

//   const handleAddOrEdit = () => {
//     if (editingId) {
//       dispatch(editIntro({ id: editingId, name, description }));
//       setEditingId(null);
//     } else {
//       dispatch(addIntro({ name, description }));
//     }
//     setName('');
//     setDescription('');
//   };

//   const handleEdit = (intro: Intro) => {
//     setEditingId(intro.id);
//     setName(intro.name);
//     setDescription(intro.description);
//   };

//   const handleDelete = (id: string) => dispatch(deleteIntro(id));

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>📝 Intros App</Text>

//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Description"
//         value={description}
//         onChangeText={setDescription}
//         style={styles.input}
//       />
//       <Button title={editingId ? 'Save Edit' : 'Add Intro'} onPress={handleAddOrEdit} />

//       <FlatList
//         data={intros}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>{item.name}</Text>
//             <Text>{item.description}</Text>
//             <View style={styles.buttons}>
//               <Button title="Edit" onPress={() => handleEdit(item)} />
//               <Button title="Delete" color="red" onPress={() => handleDelete(item.id)} />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 6 },
//   card: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginVertical: 5, borderRadius: 6 },
//   cardTitle: { fontWeight: 'bold', fontSize: 18 },
//   buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
// });

// export default IntroScreen;
