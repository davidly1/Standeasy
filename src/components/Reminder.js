import { View, Text } from 'react-native'
import React from 'react'

const Reminder = ({ reminders }) => {
  return (
    <View>
      {reminders.map((reminder) => (
        <Text key={reminders.indexOf(reminder)}>{reminder}</Text>
      ))}
    </View>
  )
}

export default Reminder
