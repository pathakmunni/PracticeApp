// src/store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../features/counterSlice';
import introReducer from '../features/introSlice';
import demoReducer from '../features/demoSlice';
import authReducer from '../features/authSlice';
// Add other reducers here if needed

export const rootReducer = combineReducers({
  counter: counterReducer,
  intro: introReducer,
  demo: demoReducer,
  auth: authReducer,
  // ...other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
