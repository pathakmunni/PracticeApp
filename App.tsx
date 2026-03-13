///////==========================================================================================
//////ExampleOne Navigation with Redux

// import React from "react";
// import AppNavigator from "./src/ExampleSeven/navigation/AppNavigator";

// export default function App() {
//   return (
//         <AppNavigator />
//   );
// }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { Provider } from 'react-redux';
// import store from './src/ExampleOne/store/store';
// import RootNavigator from './src/ExampleOne/navigation/RootNavigator';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

// import React from 'react';
// // import { enableScreens } from 'react-native-screens';
// // enableScreens();

// import { Provider } from 'react-redux';
// import store from './src/store/store';
// import BottomTabs from './src/navigation/BottomTabs';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <BottomTabs />
//     </Provider>
//   );
// }

///////==========================================================================================
//// ExampleTwo UserListScreen.tsx or TodoScreen

// import React from 'react';
// import UserListScreen from './src/ExampleTwo/UserListScreen';
// import { Provider } from 'react-redux';
// import TodoScreen from './src/ExampleTwo/src/screens/TodoScreen';
// import store from './src/ExampleOne/store/store';

// export default function App() {
//   return (
//     // <UserListScreen />
//     <Provider store={store}>
//       <TodoScreen />
//     </Provider>
//   );
// }

/////ExampleTwo LoginScreen.tsx and HomeScreen.tsx

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./src/ExampleTwo/src/screens/LoginScreen";
// import HomeScreen from "./src/ExampleTwo/src/screens/HomeScreen";

// export type RootStackParamList = {
//   Login: undefined;
//   Home: undefined;
// };

// const Stack = createNativeStackNavigator<RootStackParamList>();

// const App = () => (
//   <NavigationContainer>
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Login" component={LoginScreen} />
//       <Stack.Screen name="Home" component={HomeScreen} />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// export default App;

///////==========================================================================================
//ExampleThree UserListScreen.tsx

// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleThree/store/store";
// import AppNavigator from "./src/ExampleThree/AppNavigator";

// export default function App() {
//   return (
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   );
// }

///////==========================================================================================
//ExampleFour LoginScreen.tsx and DashboardScreen.tsx
// import React from "react";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleFour/store/store";
// import AppNavigator from "./src/ExampleFour/AppNavigator";

// export default function App() {
//   return (
//     <Provider store={store}>
//       <AppNavigator />
//     </Provider>
//   );
// }

///////==========================================================================================
//ExampleFive Counter with Redux Toolkit
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/ExampleFive/redux/store';
// import Home from './src/ExampleFive/Home';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <Home />
//     </Provider>
//   );
// }

///////==========================================================================================
////ExampleSix LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/ExampleSix/navigation/AppNavigator";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleSix/redux/store";

// export default function App() {
//   return (
//      <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

////////==========================================================================================
////ExampleSix copy LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/ExampleSeven/navigation/AppNavigator";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleSeven/redux/store";

// export default function App() {
//   return (
//      <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

////////==========================================================================================
////ExampleSeven LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from "react";
// import AppNavigator from "./src/ExampleSeven/navigation/AppNavigator";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleSeven/redux/store";

// export default function App() {
//   return (
//      <Provider store={store}>
//         <AppNavigator />
//     </Provider>
//   );
// }

////////==========================================================================================
////ExampleEight LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/ExampleEight/navigation/AppNavigator";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleEight/redux/store";

// export default function App() {
//   return (
//      <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

////////==========================================================================================
////ExampleNine LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { Provider } from "react-redux";
// import { store } from "./src/ExampleNine/redux/store";
// import AppNavigator from "./src/ExampleTen/navigation/AppNavigator";

// export default function App() {
//   return (
//      <Provider store={store}>
//       <NavigationContainer>
//         <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }

////////==========================================================================================
////ExampleTen LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import AppNavigator from './src/ExampleTen/navigation/AppNavigator';
// import { Provider } from "react-redux";
// import { store } from './src/ExampleTen/redux/store';
// const App = () => {
//   return (
//       <Provider store={store}>
//        <NavigationContainer>
//          <AppNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;

// // /**
// //  * Sample React Native App
// //  * https://github.com/facebook/react-native
// //  *
// //  * @format
// //  */

// // import { NewAppScreen } from '@react-native/new-app-screen';
// // import { StatusBar, StyleSheet, useColorScheme, View,Text } from 'react-native';
// // import {
// //   SafeAreaProvider,
// //   useSafeAreaInsets,
// // } from 'react-native-safe-area-context';

// // function App() {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   return (
// //     <SafeAreaProvider>
// //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// //       <AppContent />
// //     </SafeAreaProvider>
// //   );
// // }

// // function AppContent() {
// //   const safeAreaInsets = useSafeAreaInsets();

// //   return (
// //     <View style={styles.container}>
// //       <NewAppScreen
// //         templateFileName="App.tsx"
// //         safeAreaInsets={safeAreaInsets}
// //       />
// //       {/* <Text>Hello</Text> */}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //   },
// // });

// // export default App;

// import React, { useEffect } from 'react'
// import { Provider, useDispatch } from 'react-redux'
// import { store } from './src/app/store'
// import RootNavigator from './src/navigation/RootNavigator'
// import { initDB } from './src/services/sqliteService'
// import { loadCourse } from './src/features/home/homeSlice'
// import { useSync } from './src/hooks/useSync'
// import { View, ActivityIndicator } from 'react-native'

// /**
//  * AppInitializer handles:
//  * - DB init
//  * - Course loading
//  * - Sync listener
//  */
// const AppInitializer = () => {
//   const dispatch = useDispatch()

//   useSync()

//   useEffect(() => {
//     const initializeApp = async () => {
//       // 1️⃣ Initialize SQLite
//       initDB()

//       // 2️⃣ Load course (API / SQLite / JSON fallback)
//       // await dispatch(loadCourse())
//     }

//     initializeApp()
//   }, [dispatch])

//   return <RootNavigator />
// }

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppInitializer />
//     </Provider>
//   )
// }

// export default App

// /**
//  * Sample React Native App
//  *

// import React, { useEffect } from 'react'
// import { Provider, useDispatch } from 'react-redux'
// import { store } from './src/ExampleSqlLight/app/store'
// import RootNavigator from './src/ExampleSqlLight/navigation/RootNavigator'
// import { initDB } from './src/ExampleSqlLight/services/sqliteService'
// import { NavigationContainer } from '@react-navigation/native'
// import { useSync } from './src/ExampleSqlLight/hooks/useSync'

// import { getCourseFromDB, saveCourseToDB }
// from './src/ExampleSqlLight/services/sqliteService'

// import { loadCourse, setUnits }
// from './src/ExampleSqlLight/features/home/homeSlice'

// const AppInitializer = () => {
//   const dispatch = useDispatch()

//   useSync()

//   useEffect(() => {
//   const init = async () => {
//     await initDB()

//     const localCourse = await getCourseFromDB()

//     if (localCourse.length > 0) {
//       dispatch(setUnits(localCourse))
//     } else {
//       const apiCourse = await dispatch(loadCourse()).unwrap()
//       await saveCourseToDB(apiCourse)
//     }
//   }

//   init()
// }, [dispatch])

//   return (
//     <NavigationContainer>
//       <RootNavigator />
//     </NavigationContainer>
//   )
// }

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppInitializer />
//     </Provider>
//   )
// }

// export default App

/////==========================================================================================
////UKCO =======

// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/UKCO/store';
// import RootNavigator from './src/UKCO/navigation/RootNavigator';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <RootNavigator />
//     </Provider>
//   );
// };

// export default App;

//////==========================================================================================
////UKCO copy =======
// import 'react-native-get-random-values';
// import React from 'react';
// import { Provider } from 'react-redux';
// import { store } from './src/UKCO_IMO_APP/store/store';
// import RootNavigator from './src/UKCO_IMO_APP/navigation/RootNavigator';
// import { enableScreens } from 'react-native-screens';
// enableScreens();
// // import { I18nManager } from 'react-native';
// // import i18n from './src/UKCO_IMO_APP/i18n';
// export default function App() {
//   // if (i18n.language === 'ar') {
//   //   I18nManager.forceRTL(true);
//   // } else {
//   //   I18nManager.forceRTL(false);
//   // }
//   return (
//     <Provider store={store}>
//       <RootNavigator />
//     </Provider>
//   );
// }

//////==========================================================================================
////UKCO copy =======
import 'react-native-get-random-values';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/UKCO_IMOApp/store/store';
import RootNavigator from './src/UKCO_IMOApp/navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';
enableScreens();
export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}



// import React from 'react'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

// import { store, persistor } from './src/UKCO_App/store/store'
// import RootNavigator from './src/UKCO_App/navigation/RootNavigator'

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <RootNavigator />
//       </PersistGate>
//     </Provider>
//   )
// }