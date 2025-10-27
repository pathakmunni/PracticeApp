// App.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

// ✅ Redux Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
  },
});

const { increment, decrement } = counterSlice.actions;

// ✅ Store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});

// ✅ UI Component
const CounterScreen = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:32, marginBottom:20 }}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
    </View>
  );
};

// ✅ Wrap with Provider
export default function App() {
  return (
    <Provider store={store}>
      <CounterScreen />
    </Provider>
  );
}
