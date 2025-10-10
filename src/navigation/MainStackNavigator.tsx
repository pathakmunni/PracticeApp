
// src/navigation/MainStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import InterviewQuestionScreen from '../screens/InterviewQuestionScreen';
import OptimizedListScreen from '../screens/OptimizedList';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Bottom Tabs (Main App Area) */}
      <Stack.Screen name="MainTabs" component={MainTabs} />

      {/* Other standalone screens */}
      <Stack.Screen
        name="InterviewQuestion"
        component={InterviewQuestionScreen}
        options={{ headerShown: true, title: 'InterviewQuestions' }}
      />
      <Stack.Screen
        name="OptimizedList"
        component={OptimizedListScreen}
        options={{ headerShown: true, title: 'Optimized List' }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
