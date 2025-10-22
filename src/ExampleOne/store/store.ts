// import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counterSlice';
// import introReducer from '../features/introSlice';
// import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// import { rootReducer } from './rootReducer';
  
// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//     intro: introReducer,
//     root: rootReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // useful if storing non-serializable data like Dates, functions
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Typed hooks for use throughout your app
export const useTypedDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;


