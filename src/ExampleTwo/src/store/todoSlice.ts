import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
};

// Async Thunks
export const loadTodos = createAsyncThunk("todos/load", async () => {
  const data = await AsyncStorage.getItem("todos");
  return data ? JSON.parse(data) : [];
});

export const saveTodos = createAsyncThunk("todos/save", async (todos: Todo[]) => {
  await AsyncStorage.setItem("todos", JSON.stringify(todos));
});

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = { id: Date.now().toString(), text: action.payload, completed: false };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(loadTodos.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addTodo, toggleTodo, deleteTodo, setTodos } = todoSlice.actions;
export default todoSlice.reducer;
