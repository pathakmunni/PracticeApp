///////==========================================================================================
//////ExampleOne Navigation with Redux

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

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
// import AppNavigator from "./src/ExampleNine/navigation/AppNavigator";
import { Provider } from "react-redux";
import { store } from "./src/ExampleNine/redux/store";
import NetworkInfoExm from "./src/ExampleNine/screens/NetworkInfoExm";
import AppNavigator from "./src/ExampleNine/navigation/AppNavigator";

export default function App() {
  return (
     <Provider store={store}>
        <AppNavigator />
    </Provider>
  );
} 

////////==========================================================================================
////ExampleTen LoginScreen.tsx and DashboardScreen.tsx with Navigation

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// // import { AuthProvider } from './src/ExampleTen/context/AuthContext';
// // import LoginScreen from './src/ExampleTen/screens/LoginScreen';
// import OfflineQueueExample from './src/ExampleTen/screens/OfflineQueueExample';

// const App = () => {
//   return (
//       <NavigationContainer>
//         {/* <LoginScreen /> */}
//         <OfflineQueueExample />
//       </NavigationContainer>
//   );
// };

// export default App;

