import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { collection, doc, setDoc } from 'firebase/firestore'
import { app } from '../../firebase'
import { db } from '../../firebase'

const AddReminder = () => {
  const navigation = useNavigation()
  const auth = getAuth(app)

  const goHomeScreen = () => navigation.navigate('Home')

  const remindersRef = collection(db, 'reminders')
  const uid = auth.currentUser.uid

  const [reminder, setReminder] = useState({
    blockers: '',
    tasks: ''
  })

  const createReminder = async () => {
    await setDoc(doc(remindersRef, uid), {
      blockers: ['test123'],
      tasks: ['anothertest1']
    })

    // redirect user to Home screen after adding reminder
    goHomeScreen()
  }

  return (
    <View>
      <Text>AddReminder</Text>
      <TouchableOpacity
        className='bg-white rounded-lg p-2 mt-4 w-28'
        onPress={goHomeScreen}
      >
        <Text>Go back</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className='bg-white rounded-lg p-2 mt-4 w-32'
        onPress={createReminder}
      >
        <Text>Add a Reminder</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddReminder
