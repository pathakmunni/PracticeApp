import React from 'react'
import { View } from 'react-native'

const ProgressBar = ({ percentage }: { percentage: number }) => {
  return (
    <View style={{ height: 8, backgroundColor: '#ddd' }}>
      <View
        style={{
          width: `${percentage}%`,
          backgroundColor: 'green',
          height: 8,
        }}
      />
    </View>
  )
}

export default ProgressBar
