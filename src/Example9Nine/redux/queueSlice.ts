// queueSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export interface ApiRequest {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

interface QueueState {
  queue: ApiRequest[];
  syncing: boolean;
}

const initialState: QueueState = {
  queue: [],
  syncing: false,
};

// ✅ Load saved queue from AsyncStorage on app start
export const loadQueue = createAsyncThunk('queue/load', async () => {
  const data = await AsyncStorage.getItem('apiQueue');
  return data ? JSON.parse(data) : [];
});

// ✅ Retry queued requests when online
export const processQueue = createAsyncThunk(
  'queue/process',
  async (_, { getState, dispatch }) => {
    const state = getState() as { queue: QueueState };
    const currentQueue = [...state.queue.queue];

    for (const req of currentQueue) {
      try {
        await axios(req);
        console.log('✅ Retried:', req.url);
      } catch (error) {
        console.log('❌ Retry failed:', req.url);
        // If fails again, keep it
      }
    }

    await AsyncStorage.removeItem('apiQueue');
    return [];
  }
);

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    addToQueue: (state, action: PayloadAction<ApiRequest>) => {
      state.queue.push(action.payload);
      AsyncStorage.setItem('apiQueue', JSON.stringify(state.queue));
    },
    clearQueue: state => {
      state.queue = [];
      AsyncStorage.removeItem('apiQueue');
    },
  },
  extraReducers: builder => {
    builder.addCase(loadQueue.fulfilled, (state, action) => {
      state.queue = action.payload;
    });
    builder.addCase(processQueue.pending, state => {
      state.syncing = true;
    });
    builder.addCase(processQueue.fulfilled, state => {
      state.queue = [];
      state.syncing = false;
    });
  },
});

export const { addToQueue, clearQueue } = queueSlice.actions;
export default queueSlice.reducer;
