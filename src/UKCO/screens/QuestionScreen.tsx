import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import SlideRenderer from '../components/SlideRenderer';

export default function QuestionScreen({ route, navigation }: any) {
  const { slides, unitQuize } = route.params;
  const [index, setIndex] = useState(0);
  console.log('Slides received in QuestionScreen:', slides); // Debug log to check the received slides
  console.log('Unit quiz received in QuestionScreen:', unitQuize); // Debug log to check the received unit quiz

  const currentSlide = slides[index];
  const progress = (index + 1) / slides.length;

  console.log('Current slide:', currentSlide); // Debug log to check the current slide

  return (
    <View style={{ flex: 1 }}>
      <ProgressBar progress={progress} />

      <View style={{ flex: 1, padding: 20 }}>
        <SlideRenderer slide={currentSlide} quize={unitQuize} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 20,
        }}
      >
        <Button
          title="Previous"
          disabled={index === 0}
          onPress={() => setIndex(prev => prev - 1)}
        />
        <Button
          title={index === slides.length - 1 ? 'Finish' : 'Next'}
          onPress={() =>
            slides.length - 1 > index
              ? setIndex(prev => prev + 1)
              : Alert.alert('Quiz Completed', 'You have completed the quiz!', [
                  { text: 'OK', onPress: () => navigation.goBack() },
                ])
          }
        />
      </View>
    </View>
  );
}
