import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userReducer from './userSlice';
import queueReducer from './queueSlice';


export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userReducer,
    queue: queueReducer,  
  },
});

// Types for useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
