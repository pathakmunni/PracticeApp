import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from 'redux'

import homeReducer from '../features/home/homeSlice'
import learningReducer from '../features/learning/learningSlice'
import progressReducer from '../features/progress/progressSlice'
import courseReducer from '../features/course/courseSlice'  

const rootReducer = combineReducers({
  home: homeReducer,
  learning: learningReducer,
  progress: progressReducer,
  course: courseReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['progress', 'learning'],
}

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
)

export const store = configureStore({
  reducer: persistedReducer,

})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// import { configureStore } from '@reduxjs/toolkit'
// import homeReducer from '../features/home/homeSlice'
// import learningReducer from '../features/learning/learningSlice'
// import progressReducer from '../features/progress/progressSlice'

// export const store = configureStore({
//   reducer: {
//     home: homeReducer,
//     learning: learningReducer,
//     progress: progressReducer,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch



// import { configureStore } from '@reduxjs/toolkit'
// import courseReducer from '../features/course/courseSlice'
// import learningReducer from '../features/learning/learningSlice'
// import progressReducer from '../features/progress/progressSlice'
// import homeReducer from '../features/home/homeSlice'

// export const store = configureStore({
//   reducer: {
//     course: courseReducer,
//     learning: learningReducer,
//     progress: progressReducer,
//     home:homeReducer,
//   },
// })

// export type RootState = ReturnType<
//   typeof store.getState
// >
// export type AppDispatch = typeof store.dispatch
// function homeReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error('Function not implemented.')
// }

