import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { app } from '../../firebase'
import { db } from '../../firebase'
import Reminder from '../components/Reminder'

const Home = () => {
  const [reminders, setReminders] = useState([])
  const auth = getAuth(app)
  const navigation = useNavigation()
  const uid = auth.currentUser.uid

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  const addReminder = () => navigation.navigate('AddReminder')

  // fetching reminders from Firestore
  useEffect(() => {
    const getReminders = async () => {
      try {
        const userRemindersRef = doc(db, 'reminders', uid)
        const userReminders = await getDoc(userRemindersRef)
        if (userReminders.exists()) {
          console.log(userReminders.data())
          setReminders(userReminders.data().tasks)
          console.log(reminders)
        } else {
          console.log('none found')
        }
      } catch (err) {
        console.error(err)
      }
    }
    getReminders()
  }, [])

  return (
    <View>
      <TouchableOpacity
        className='bg-white rounded-lg p-2 mt-4 w-20'
        onPress={handleLogout}
      >
        <Text className='text-center'>Logout</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className='bg-white rounded-lg p-2 mt-4 w-28'
        onPress={addReminder}
      >
        <Text>Add reminder</Text>
      </TouchableOpacity>
      <Reminder reminders={reminders} />
    </View>
  )
}

export default Home
