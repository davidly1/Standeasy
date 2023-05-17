import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'

const Reminder = ({ reminders, handleDelete }) => {
  return (
    <View className='flex flex-col'>
      {reminders.map((reminder) => (
        <View className='border rounded-2xl p-2 m-2 bg-white' key={reminder.id}>
          <Text className='font-medium text-lg'>{reminder.task}</Text>
          <View className='flex flex-row pt-4 justify-between'>
            <Text className='text-red-600'>{reminder.blocker}</Text>
            <TouchableOpacity onPress={() => handleDelete(reminder.id)}>
              <MaterialIcons name='delete' size={28} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Reminder
