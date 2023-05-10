import { View, Text } from 'react-native'
import React from 'react'

const Reminder = ({ reminders }) => {
  return (
    <View className='flex flex-col'>
      {reminders.map((reminder) => (
        <View className='border rounded-2xl p-2 m-2 bg-white'>
          <Text
            key={reminders.indexOf(reminder)}
            className='font-medium text-lg'
          >
            {reminder.task}
          </Text>
          <Text className='text-red-600 pt-4'>{reminder.blocker}</Text>
        </View>
      ))}
    </View>
  )
}

export default Reminder
