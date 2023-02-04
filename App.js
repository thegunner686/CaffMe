import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login/Login';
import HomeStack from './src/screens/Home/HomeStack';

const Stack = createNativeStackNavigator();

export default function App() {
  const isAuthenticated = true;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ route, navigation }) => ({
        headerShown: false,
      })}>
        {isAuthenticated ? <Stack.Screen name="Main" component={HomeStack}></Stack.Screen> : <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
