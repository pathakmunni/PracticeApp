import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from 'react';

const OFFLINE_QUEUE_KEY = 'offlineQueue';

const addToOfflineQueue = async (request: any) => {
  const existing = JSON.parse(await AsyncStorage.getItem(OFFLINE_QUEUE_KEY)) || [];
  existing.push(request);
  await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(existing));
};

const processQueue = async () => {
  const queue = JSON.parse(await AsyncStorage.getItem(OFFLINE_QUEUE_KEY)) || [];
  if (queue.length === 0) return;

  console.log(`🔁 Retrying ${queue.length} offline requests...`);
  for (const req of queue) {
    try {
      await axios(req);
      console.log('✅ Synced:', req.url);
    } catch (e) {
      console.log('❌ Retry failed:', req.url);
    }
  }

  await AsyncStorage.removeItem(OFFLINE_QUEUE_KEY);
};

const useFetch = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) processQueue();
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any
  ) => {
    const netInfo = await NetInfo.fetch();
    const token = await AsyncStorage.getItem('authToken');

    const config = {
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      timeout: 15000,
    };

    if (!netInfo.isConnected) {
      console.warn('📴 Offline — queuing request:', url);
      await addToOfflineQueue(config);
      return { queued: true };
    }

    try {
      const res = await axios(config);
      return res.data;
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        console.error('API Error:', err.response?.status, err.response?.data);
      } else {
        console.error('Non-Axios Error:', err);
      }
      throw err;
    }
  };

  return { fetchData };
};

export default useFetch;
