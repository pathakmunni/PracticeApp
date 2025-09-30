// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useAppDispatch, useAppSelector } from '../store/hooks';
// import { increment, decrement, reset, incrementByAmount } from '../features/counterSlice';

// const CounterScreen: React.FC = () => {
//   const count = useAppSelector((state) => state.counter.value);
//   const dispatch = useAppDispatch();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>🔢 Counter</Text>
//       <Text style={styles.count}>{count}</Text>

//       <Button title="➕ Increment" onPress={() => dispatch(increment())} />
//       <Button title="➖ Decrement" onPress={() => dispatch(decrement())} />
//       <Button title="🔄 Reset" onPress={() => dispatch(reset())} />
//       <Button title="➕ +5" onPress={() => dispatch(incrementByAmount(5))} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
//   title: { fontSize: 24, marginBottom: 20 },
//   count: { fontSize: 48, marginVertical: 20 },
// });

// export default CounterScreen;


import React from 'react';
import { View, Text, Button } from 'react-native';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import { increment, decrement, reset } from '../features/counterSlice';

const CounterScreen = () => {
  const count = useTypedSelector((state) => state.counter.value);
  const dispatch = useTypedDispatch();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 48 }}>{count}</Text>
      <Button title="Increment" onPress={() => dispatch(increment())} />
      <Button title="Decrement" onPress={() => dispatch(decrement())} />
      <Button title="Reset" onPress={() => dispatch(reset())} />
    </View>
  );
};

export default CounterScreen;
