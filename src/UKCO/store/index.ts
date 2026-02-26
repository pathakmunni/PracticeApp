import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import progressReducer from './slices/progressSlice';
// import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    content: contentReducer,
    progress: progressReducer,
    // profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;