import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

export default function SlideRenderer({ slide, quize }: any) {

  console.log('Rendering slide:', slide);
  console.log('Quiz data:', quize);
  if (slide.type === 'text') {
    return (
      <View>
        {slide.content && <Text>{slide.content}</Text>}
        {slide.list &&
          slide.list.map((item: string, i: number) => (
            <Text key={i}>• {item??"text"}</Text>
          ))}
      </View> 
    );
  }

   if (slide.type === 'image') {
    return (
      <View>
        <Text>{slide.content}</Text>
        <Image source={require('../assets/image/maxresdefault.jpg')} style={{ width: 300, height: 200 }} />
      </View>
    );
  }

  if (quize.type === 'single_choice') {
    return (
      <View>
        <Text>{slide.question}</Text>
        {slide.options.map((opt: string, i: number) => (
          <TouchableOpacity key={i}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (quize.type === 'single_choice') {
    return (
      <View>
        <Text>{slide.question}</Text>
        {slide.options.map((opt: string, i: number) => (
          <TouchableOpacity key={i}>
            <Text>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  if (quize.type === 'true_false') {
    return (
      <View>
        <Text>{slide.question}</Text>
        <TouchableOpacity><Text>True</Text></TouchableOpacity>
        <TouchableOpacity><Text>False</Text></TouchableOpacity>
      </View>
    );
  }

  return null;
}