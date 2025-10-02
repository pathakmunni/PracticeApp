import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/store/store';
import RootNavigator from './src/navigation/RootNavigator';
// import store from '@/store/store';
// import RootNavigator from '@/navigation/RootNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}





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
