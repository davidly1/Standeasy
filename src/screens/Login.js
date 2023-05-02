import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { app } from '../../firebase'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const auth = getAuth(app)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) navigation.replace('Home')
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed in
        const user = userCredentials.user
        console.log(`Registered with ${user.email}`)
      })
      .catch((err) => {
        setError(true)
        console.error(err.message)
      })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(`Logged in with ${user.email}`)
      })
      .catch((err) => {
        setError(true)
        console.error(err.message)
      })
  }
  return (
    <KeyboardAvoidingView behavior='padding'>
      <View className='h-screen flex flex-col justify-center items-center'>
        <Text className='text-center font-medium pb-4 text-lg text-gray-800'>
          Login/Register
        </Text>
        <TextInput
          placeholder='Enter your email'
          className='w-4/5 bg-white rounded-xl px-4 mb-2 py-1.5'
          value={email}
          onChangeText={(email) => setEmail(email)}
          inputMode='email'
        />
        <TextInput
          placeholder='Enter your password'
          secureTextEntry
          className='bg-white w-4/5 rounded-xl px-4 py-1.5'
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        {error && (
          <Text className='text-red-600 text-center font-medium pt-4'>
            Invalid email/password!
          </Text>
        )}
        <View className='flex flex-row gap-2 mt-4'>
          <TouchableOpacity
            className='bg-white rounded-lg p-2 mt-4 w-20'
            onPress={handleSignIn}
          >
            <Text className='text-center'>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className='bg-white rounded-lg p-2 mt-4 w-20'
            onPress={handleSignUp}
          >
            <Text className='text-center'>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login
