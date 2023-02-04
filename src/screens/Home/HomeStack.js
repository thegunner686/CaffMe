import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return <Stack.Navigator screenOptions={({ route, navigation }) => ({ headerShown: false })}>
    <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
  </Stack.Navigator>
}

export default HomeStack;