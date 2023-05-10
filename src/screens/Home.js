import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
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
      storedReminders.forEach((doc) => filteredReminders.add(doc.data()))
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
    <SafeAreaView>
      <ScrollView>
        <View className='flex flex-row justify-between mt-8 mx-3'>
          <MaterialIcons name='logout' size={28} onPress={handleLogout} />
          <MaterialIcons
            name='add-circle-outline'
            size={28}
            onPress={addReminder}
          />
        </View>
        <Text className='text-center font-bold text-2xl'>Home</Text>

        <Reminder reminders={reminders} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
