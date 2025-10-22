// src/screens/SplashScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/rootReducer';

const SplashScreen = () => {
  const navigation = useNavigation();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStack' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AuthStack' }],
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <ActivityIndicator size="large" color="#007AFF" />
      <Text style={{ marginTop: 20, fontSize: 16 }}>Loading...</Text>
    </View>
  );
};

export default SplashScreen;


// import React, { useEffect } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import { useTypedSelector } from '../store/store';

// const SplashScreen = ({ navigation }: any) => {
//   const isAuthenticated = useTypedSelector(state => state.auth.isAuthenticated);

//   useEffect(() => {
//     setTimeout(() => {
//       if (isAuthenticated) {
//         navigation.replace('MainTabs');
//       } else {
//         navigation.replace('Login');
//       }
//     }, 1500);
//   }, [isAuthenticated]);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator size="large" />
//       <Text style={{ marginTop: 16 }}>Loading...</Text>
//     </View>
//   );
// };

// export default SplashScreen;
