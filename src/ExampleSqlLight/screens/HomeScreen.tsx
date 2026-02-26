import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useNavigation } from '@react-navigation/native'
import UnitCard from '../components/UnitCard'

const HomeScreen = () => {
  const navigation = useNavigation<any>()

  const { units } = useSelector(
    (state: RootState) => state.home
  )

  const progressState = useSelector(
    (state: RootState) => state.progress
  )

  // 🔥 Calculate full unit progress
  const calculateUnitProgress = (unit: any) => {
    if (!unit.sections) return 0

    let totalSlides = 0
    let completedSlides = 0

    unit.sections.forEach((section: any) => {
      const sectionId =
        section.id || section.section_id

      const slides =
        progressState?.[unit.id || unit.unit_id]?.[
          sectionId
        ] || {}

      totalSlides +=
        section.topics?.reduce(
          (sum: number, topic: any) =>
            sum + (topic.slides?.length || 0),
          0
        ) || 0

      completedSlides += Object.values(slides).filter(
        (slide: any) => slide.completed
      ).length
    })

    if (totalSlides === 0) return 0

    return Math.floor(
      (completedSlides / totalSlides) * 100
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        My Learning
      </Text>

      <FlatList
        data={units}
        keyExtractor={item =>
          String(item.id || item.unit_id)
        }
        renderItem={({ item }) => (
          <UnitCard
            title={item.title}
            progress={calculateUnitProgress(
              item
            )}
            onPress={() =>
              navigation.navigate('Sections', {
                unitId:
                  item.id || item.unit_id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <Text>No units available</Text>
        }
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F6F8',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})
