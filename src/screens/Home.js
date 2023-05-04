import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getAuth, signOut } from 'firebase/auth'
import { collection, getDocs, query, where } from 'firebase/firestore'
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
  const getReminders = async () => {
    try {
      // only grab users reminders
      const userRemindersQuery = query(
        collection(db, 'reminders'),
        where('uid', '==', uid)
      )
      const storedReminders = await getDocs(userRemindersQuery)
      let filteredReminders = new Set()
      storedReminders.forEach((doc) => filteredReminders.add(doc.data().task))
      setReminders([...filteredReminders])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getReminders()
    })
    return unsubscribe
  }, [navigation])

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

      <TouchableOpacity
        className='bg-white rounded-lg p-2 mt-4 w-28'
        onPress={() => setReminders([])}
      >
        <Text>Remove all reminder</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home
