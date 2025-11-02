// OfflineQueueExample.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// NetInfo.fetch().then(state => console.log('Is connected?', state.isConnected));

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const OfflineQueueExample = () => {
  const [isConnected, setIsConnected] = useState(true);

  // ✅ Detect network status
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
      if (state.isConnected) {
        processQueuedRequests();
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Function to handle API call
  const sendData = async () => {
    const data = {
      title: 'Offline Sync Test',
      body: 'This is a demo for queue retry',
      userId: 1,
    };

    if (!isConnected) {
      // Save failed request to queue
      await queueRequest({ url: API_URL, method: 'POST', data });
      Alert.alert('Offline', 'Saved request for retry when online.');
      return;
    }

    try {
      await axios.post(API_URL, data);
      Alert.alert('Success', 'Data sent to server.');
    } catch (error) {
      console.log('Error sending data:', error);
      await queueRequest({ url: API_URL, method: 'POST', data });
    }
  };

  // ✅ Save failed requests to AsyncStorage
  const queueRequest = async (request: any) => {
    try {
      const existingQueue = await AsyncStorage.getItem('apiQueue');
      const queue = existingQueue ? JSON.parse(existingQueue) : [];
      queue.push(request);
      await AsyncStorage.setItem('apiQueue', JSON.stringify(queue));
    } catch (err) {
      console.log('Error saving to queue:', err);
    }
  };

  // ✅ Process queued requests when online
  const processQueuedRequests = async () => {
    const queuedData = await AsyncStorage.getItem('apiQueue');
    if (!queuedData) return;

    const queue = JSON.parse(queuedData);

    for (const req of queue) {
      try {
        await axios(req);
        console.log('✅ Retried successfully:', req.url);
      } catch (err) {
        console.log('❌ Retry failed:', req.url);
        // Keep it in queue if still failing
      }
    }

    // Clear queue after processing
    await AsyncStorage.removeItem('apiQueue');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        Network Status: {isConnected ? 'Online ✅' : 'Offline 🚫'}
      </Text>
      <Button title="Send Data" onPress={sendData} />
    </View>
  );
};

export default OfflineQueueExample;
