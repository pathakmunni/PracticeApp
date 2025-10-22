import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTypedDispatch, useTypedSelector } from '../store/store';
import { increment, decrement, reset } from '../features/counterSlice';

const CounterScreen = () => {
  const count = useTypedSelector((state) => state.counter.value);
  const dispatch = useTypedDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter</Text>
      <Text style={styles.count}>{count}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#4caf50' }]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: '#f44336' }]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.btn, { backgroundColor: '#1e90ff', marginTop: 20 }]}
        onPress={() => dispatch(reset())}
      >
        <Text style={styles.btnText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CounterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  count: { fontSize: 60, fontWeight: 'bold', marginBottom: 30, color: '#333' },
  row: { flexDirection: 'row', gap: 20 },
  btn: { paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, elevation: 3 },
  btnText: { fontSize: 20, fontWeight: '600', color: '#fff' },
});



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


// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { useTypedDispatch, useTypedSelector } from '../store/store';
// import { increment, decrement, reset } from '../features/counterSlice';

// const CounterScreen = () => {
//   const count = useTypedSelector((state) => state.counter.value);
//   const dispatch = useTypedDispatch();

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text style={{ fontSize: 48 }}>{count}</Text>
//       <Button title="Increment" onPress={() => dispatch(increment())} />
//       <Button title="Decrement" onPress={() => dispatch(decrement())} />
//       <Button title="Reset" onPress={() => dispatch(reset())} />
//     </View>
//   );
// };

// export default CounterScreen;
