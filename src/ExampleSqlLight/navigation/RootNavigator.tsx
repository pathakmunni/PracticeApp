// import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack'

// import HomeScreen from '../screens/HomeScreen'
// import SectionsScreen from '../screens/SectionsScreen'
// import QuestionScreen from '../screens/QuestionScreen'
// import TopicsScreen from '../screens/TopicsScreen'

// const Stack = createNativeStackNavigator()

// const RootNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Sections" component={SectionsScreen} />
//       <Stack.Screen name="Question" component={QuestionScreen} />
//       <Stack.Screen name="Topics" component={TopicsScreen} />
//     </Stack.Navigator>
//   )
// }

// export default RootNavigator


import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/HomeScreen'
import SectionsScreen from '../screens/SectionsScreen'
import TopicsScreen from '../screens/TopicsScreen'
import QuestionScreen from '../screens/QuestionScreen'

export type RootStackParamList = {
  Home: undefined
  Sections: { unitId: number | string }
  Topics: { unitId: number | string; sectionId: number | string }
  Question: {
    unitId: number | string
    sectionId: number | string
    topicId: number | string
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const RootNavigator = () => {
  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Sections" component={SectionsScreen} />
        <Stack.Screen name="Topics" component={TopicsScreen} />
        <Stack.Screen name="Question" component={QuestionScreen} />
      </Stack.Navigator>
    // </NavigationContainer>
  )
}

export default RootNavigator
