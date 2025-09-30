import React from 'react';
// import { enableScreens } from 'react-native-screens';
// enableScreens();

import { Provider } from 'react-redux';
import store from './src/store/store';
import BottomTabs from './src/navigation/BottomTabs';

export default function App() {
  return (
    <Provider store={store}>
      <BottomTabs />
    </Provider>
  );
}
