import React from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export default function LearningScreen({ route, navigation }) {

  const { unit } = route.params

  const progress = useSelector(
    (state: RootState) => state.progress.units[unit.unitId]
  )

  const completed = progress?.completedSections?.length || 0

  return (

    <View style={{ flex: 1 }}>

      <Text style={{ fontSize: 22, fontWeight: 'bold', margin: 20 }}>
        {unit.title}
      </Text>

      <Text style={{ marginLeft: 20 }}>
        {completed}/{unit.sections.length}
      </Text>

      <FlatList
        data={unit.sections}

        renderItem={({ item, index }) => (

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Section', {
                section: item,
                unitId: unit.unitId,
                index,
              })
            }

            style={{
              padding: 20,
              borderBottomWidth: 1,
            }}
          >

            <Text>{item.title}</Text>

          </TouchableOpacity>
        )}
      />

    </View>
  )
}