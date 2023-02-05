import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

const [loggedIn, setloggedIn] = useState(false);
const [userInfo, setuserInfo] = useState([]);

export default LoginScreen = () => {
  return <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <Image source={require('./assets/Coffme_1.png')} style={{width: 300, height: 300}} />
    <Text className='font-bold text-xl'>CaffMe</Text>
    <Text className='text-xs'>Make caffeine work for you!</Text>
    <View style={styles.sectionContainer}>
      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this._signIn}
      />
    </View>
    <View style={styles.buttonContainer}>
      {!loggedIn && <Text>You are currently logged out</Text>}
      {loggedIn && (
        <Button
          onPress={this.signOut}
          title="LogOut"
          color="red"></Button>
        )}
    </View>
    </SafeAreaView>
};

_signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const {accessToken, idToken} = await GoogleSignin.signIn();
    setloggedIn(true);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      alert('Cancel');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
      // operation (f.e. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

useEffect(() => {
  GoogleSignin.configure({
    scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
    webClientId:
      '418977770929-g9ou7r9eva1u78a3anassxxxxxxx.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  });
}, []);

signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    setloggedIn(false);
    setuserInfo([]);
  } catch (error) {
    console.error(error);
  }
};