import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './slices/contentSlice';
import progressReducer from './slices/progressSlice';
import quizReducer from './slices/quizSlice';
import profileReducer from './slices/profileSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    content: contentReducer,
    progress: progressReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;