import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "../store/store";
import { loadTodos, saveTodos, addTodo, toggleTodo, deleteTodo } from "../store/todoSlice";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const TodoScreen = () => {
  const dispatch = useDispatch();
  const { todos, loading } = useSelector((state: RootState) => state.todos);
  const [text, setText] = React.useState("");

  useEffect(() => {
    dispatch(loadTodos());
  }, []);

  useEffect(() => {
    dispatch(saveTodos(todos));
  }, [todos]);

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.todoItem}>
      <TouchableOpacity onPress={() => dispatch(toggleTodo(item.id))} style={styles.todoTextBox}>
        <Text style={[styles.todoText, item.completed && styles.completed]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => dispatch(deleteTodo(item.id))}>
        <Text style={styles.deleteBtn}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 Todo List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No todos yet</Text>}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <TodoScreen />
  </Provider>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  inputContainer: { flexDirection: "row", marginBottom: 15 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    marginLeft: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 8,
  },
  addBtnText: { color: "#fff", fontWeight: "600" },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  todoTextBox: { flex: 1 },
  todoText: { fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "#999" },
  deleteBtn: { fontSize: 20, color: "red" },
  empty: { textAlign: "center", color: "#666", marginTop: 20 },
});

export default App;
