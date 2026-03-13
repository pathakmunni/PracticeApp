import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../feature/course/screens/HomeScreen";
import UnitScreen from "../feature/course/screens/UnitScreen";
import SectionContentScreen from "../feature/course/components/questionTypes/SectionContentScreen";
import TappableDotsScreen from "../feature/course/components/questionTypes/TappableDotsScreen";
import QuizScreen from "../feature/course/screens/QuizScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
 <Stack.Navigator>

      <Stack.Screen name="Home" component={HomeScreen} />

      <Stack.Screen name="Unit" component={UnitScreen} />

      <Stack.Screen
        name="SectionContent"
        component={SectionContentScreen}
      />

      <Stack.Screen
        name="TappableDots"
        component={TappableDotsScreen}
      />

      <Stack.Screen name="Quiz" component={QuizScreen} />

    </Stack.Navigator>
    </NavigationContainer>
   
  );
}