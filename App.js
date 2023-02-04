import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import HomeStack from './src/screens/Home/HomeStack';
import { auth } from './src/utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthProvider } from './src/contexts/AuthProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      setUser(_user);
    });
    return () => unsubscribe();
  })
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={({ route, navigation }) => ({
          headerShown: false,
        })}>
          {true ? <Stack.Screen name="Main" component={HomeStack}></Stack.Screen> : <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
