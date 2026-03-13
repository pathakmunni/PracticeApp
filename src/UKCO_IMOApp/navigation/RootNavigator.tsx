import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardTabs from './DashboardTabs';
import ChooseLanguageScreen from '../feature/onboarding/screens/ChooseLanguageScreen';
import AddUserScreen from '../feature/onboarding/screens/AddUserScreen';
import ProfileSelectScreen from '../feature/onboarding/screens//ProfileSelectScreen';

import SectionScreen from '../feature/course/screens/SectionScreen';
import LearningScreen from '../feature/course/screens/LearningScreen';
import HomeScreen from '../feature/course/screens/HomeScreen';

import { useDispatch } from 'react-redux';
import { loadProfiles } from '../store/slices/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    loadSavedProfiles();
  }, []);

  const loadSavedProfiles = async () => {
    const storedProfiles = await AsyncStorage.getItem('profiles');

    if (storedProfiles) {
      const parsed = JSON.parse(storedProfiles);
      dispatch(loadProfiles(parsed));

      if (parsed.length > 0) {
        setInitialRoute('ProfileSelect');
      } else {
        setInitialRoute('ChooseLanguage');
      }
    } else {
      setInitialRoute('ChooseLanguage');
    }
  };

  if (!initialRoute) {
    return null; // or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />
        <Stack.Screen name="AddUser" component={AddUserScreen} />
        <Stack.Screen name="ProfileSelect" component={ProfileSelectScreen} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Section" component={SectionScreen} />
        <Stack.Screen name="Learning" component={LearningScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import DashboardTabs from './DashboardTabs';
// import ChooseLanguageScreen from '../screens/onboarding/ChooseLanguageScreen';
// import AddUserScreen from '../screens/onboarding/AddUserScreen';

// import SectionScreen from '../screens/SectionScreen';
// import LearningScreen from '../screens/LearningScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileSelectScreen from '../screens/onboarding/ProfileSelectScreen';

// import { useDispatch, useSelector } from 'react-redux';
// import { loadProfiles } from '../store/slices/profileSlice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { RootState } from '../store/store';

// const Stack = createNativeStackNavigator();

// export default function RootNavigator() {
//   const dispatch = useDispatch();
//   const profiles = useSelector((state: RootState) => state.profile.profiles);

//   useEffect(() => {
//     loadSavedProfiles();
//   }, []);

//   const loadSavedProfiles = async () => {
//     const storedProfiles = await AsyncStorage.getItem('profiles');

//     if (storedProfiles) {
//       dispatch(loadProfiles(JSON.parse(storedProfiles)));
//     }
//   };

//   return (
//     <NavigationContainer>
//       <Stack.Navigator
//         initialRouteName={profiles.length === 0 ? 'ChooseLanguage' : 'ProfileSelect'}
//         screenOptions={{ headerShown: false }}
//       >
//         <Stack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />
//         <Stack.Screen name="AddUser" component={AddUserScreen} />
//         <Stack.Screen name="ProfileSelect" component={ProfileSelectScreen} />
//         <Stack.Screen name="Dashboard" component={DashboardTabs} />

//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Section" component={SectionScreen} />
//         <Stack.Screen name="Learning" component={LearningScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
