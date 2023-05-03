import { View, Text, TouchableOpacity, TextInput } from 'react-native'
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
    blocker: '',
    task: '',
    name: ''
  })

  const createReminder = async () => {
    await setDoc(doc(remindersRef, reminder.name), {
      blocker: reminder.blocker,
      task: reminder.task,
      uid: uid
    })

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
      <Text>Task Name</Text>
      <TextInput
        placeholder='Task Name'
        className='w-4/5 bg-white rounded-xl px-4 mb-2 py-1.5'
        value={reminder.name}
        onChangeText={(title) => setReminder({ ...reminder, name: title })}
      />
      <Text>Task Description</Text>
      <TextInput
        placeholder='Task Description'
        className='w-4/5 bg-white rounded-xl px-4 mb-2 py-1.5'
        value={reminder.task}
        onChangeText={(description) =>
          setReminder({ ...reminder, task: description })
        }
      />
      <Text>Blocker Description</Text>
      <TextInput
        placeholder='Blocker'
        className='w-4/5 bg-white rounded-xl px-4 mb-2 py-1.5'
        value={reminder.blocker}
        onChangeText={(description) =>
          setReminder({ ...reminder, blocker: description })
        }
      />
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
