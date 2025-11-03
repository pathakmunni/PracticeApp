// App.tsx
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import { addToQueue, loadQueue, processQueue } from '../redux/queueSlice';
import type { RootState, AppDispatch } from '../redux/store';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const NetworkInfoExm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isConnected, setIsConnected] = useState(true);
  const { queue } = useSelector((state: RootState) => state.queue);

  // ✅ Load queue when app starts
  useEffect(() => {
    dispatch(loadQueue());
  }, []);

  // ✅ Detect network and process queue when online
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;
      setIsConnected(connected);

      if (connected) {
        dispatch(processQueue());
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Function to send data
  const sendData = async () => {
    const data = {
      title: 'Redux Offline Sync Test',
      body: 'Queue with Redux + AsyncStorage',
      userId: 2,
    };

    if (!isConnected) {
      dispatch(addToQueue({ url: API_URL, method: 'POST', data }));
      Alert.alert('Offline', 'Request saved to queue.');
      return;
    }

    try {
      await axios.post(API_URL, data);
      Alert.alert('Success', 'Data sent successfully.');
    } catch (error) {
      console.log('API failed, queueing...');
      dispatch(addToQueue({ url: API_URL, method: 'POST', data }));
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        Network: {isConnected ? 'Online ✅' : 'Offline 🚫'}
      </Text>
      <Text style={{ marginBottom: 10 }}>
        Queued Requests: {queue.length}
      </Text>
      <Button title="Send Data" onPress={sendData} />
    </View>
  );
};

export default NetworkInfoExm;