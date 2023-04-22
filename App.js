import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from './src/screens/Home'
import Login from './src/screens/Login'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name='Login'
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name='Home'
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
