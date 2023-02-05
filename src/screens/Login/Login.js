import { React, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../../utils/firebase';
import { signInAnonymously } from 'firebase/auth';
const LoginScreen = () => {
  const [weight, setWeight] = useState('');
  const signIn = () => {
    signInAnonymously(auth);
  };
  return (
    <SafeAreaView className="flex flex-1 flex-col items-center justify-center bg-space-cadet">
      <StatusBar style="light" />
      <Image source={require('../../../assets/Caffme.png')} style={{ width: 300, height: 300 }} />
      <Text className="pt-2 text-center text-6xl font-bold text-baby-powder">CaffMe</Text>
      <Text className="pt-2 pb-5 text-center text-xl text-baby-powder">
        Make caffeine work for you!
      </Text>
      <TouchableOpacity
        className="flex h-12 w-9/12 flex-col items-center justify-center rounded-lg bg-ocean-green shadow-sm shadow-dark-space-cadet"
        onPress={signIn}
      >
        <Text className="text-center text-lg font-bold text-baby-powder">Sign in</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
