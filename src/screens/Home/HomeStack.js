import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import AddCaffeineScreen from '../AddCaffeine/AddCaffeine';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return <Stack.Navigator screenOptions={({ route, navigation }) => ({ headerShown: false })}>
    <Stack.Screen name="AddCaffeine" component={AddCaffeineScreen}></Stack.Screen>
    <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
  </Stack.Navigator>
}

export default HomeStack;