import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { app } from '../../firebase'

const Home = () => {
  const auth = getAuth(app)

  const navigation = useNavigation()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login')
      })
      .catch((err) => {
        console.error(err.message)
      })
  }

  return (
    <TouchableOpacity
      className='bg-white rounded-lg p-2 mt-4 w-20'
      onPress={handleLogout}
    >
      <Text className='text-center'>Logout</Text>
    </TouchableOpacity>
  )
}

export default Home
