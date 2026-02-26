// import React from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'

// interface Props {
//   title: string
//   progress: number
//   onPress: () => void
// }

// const UnitCard = ({ title, progress, onPress }: Props) => {
//   return (
//     <TouchableOpacity onPress={onPress}>
//       <View>
//         <Text>{title}</Text>
//         <Text>{progress}%</Text>
//       </View>
//     </TouchableOpacity>
//   )
// }

// export default UnitCard


import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import ProgressBar from './ProgressBar'

interface Props {
  title: string
  progress: number
  onPress: () => void
}

const UnitCard: React.FC<Props> = ({
  title,
  progress,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{title}</Text>

      <ProgressBar percentage={progress} />

      <Text style={styles.percent}>
        {progress}% Completed
      </Text>
    </TouchableOpacity>
  )
}

export default UnitCard

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  percent: {
    marginTop: 6,
    fontSize: 12,
    color: '#666',
  },
})
