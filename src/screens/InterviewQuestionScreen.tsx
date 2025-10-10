import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function InterviewQuestionScreen() {
const [interviewStarted, setInterviewStarted] = React.useState(false);

  const handleStartInterview = () => {  
    console.log('Interview Started');
    setInterviewStarted(true);
  }
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.TextColor}>Interview Question Screen</Text>
      {interviewStarted && <Text style={{marginBottom:20}}>Interview in Progress...</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q1. What is React Native?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q2. Explain the difference between state and props.</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q3. How do you handle navigation in React Native?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q4. What are some common performance optimization techniques in React Native?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q5. How do you manage state in a React Native application?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q6. Can you explain the lifecycle of a React component?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q7. How do you handle styling in React Native?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q8. What are some common libraries used in React Native development?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q9. How do you debug a React Native application?</Text>}
      {interviewStarted && <Text style={{marginBottom:20}}>Q10. Can you explain the concept of Flexbox and how it is used in React Native?</Text>}
      <TouchableOpacity style={styles.Button} onPress={handleStartInterview}>
        <Text style={styles.ButtonText}>Start Interview</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  MainContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  TextColor:{
    color:'blue',
    fontSize:20,
    fontWeight:'bold',
    margin:10,
    textAlign:'center',
    textDecorationLine:'underline',
    textTransform:'uppercase',
  },
  Button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    backgroundColor:'blue',
  },
  ButtonText:{
    color:'white',
    fontSize:18,
    fontWeight:'bold',
  }
})