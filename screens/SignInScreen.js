import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, TextInput, ScrollView, View, ImageBackground, Dimensions, } from 'react-native';
import React, {useState, useEffect, Component} from 'react'
import background from '../images/yeeyee.jpg'
import { BaseNavigationContainer, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomButton from '../CustomButton';
import CustomInput from '../CustomInput';
import SignInButton from '../SignInButton';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import ForgotPasswordButton from '../ForgotPasswordButton'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import firebase, { auth, provider } from '../firebase';


function SignInScreen({ navigation }) {


      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');

      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("LoggedInPage")
          }
          return unsubscribe
        })
      })

      const handleGoogleLogin = () => {
        auth.signInWithPopup(provider).then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
        }).catch((error) => {
          const errorMessage = error.Message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
        })
      }

      const handleLogin = () => {
        auth.signInWithEmailAndPassword(username,password).then(userCredentials => {
          const user = userCredentials.user;

        })
        .catch(error => alert(error.message))
      }
    
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text style = {styles.logo}>RentBox</Text>
        <CustomInput icon = "person" placeholder="Email" value ={username} setValue={setUsername} secureTextEntry={false}/>
        <CustomInput icon = "lock-closed-sharp" placeholder="Password" value = {password} setValue = {setPassword} secureTextEntry={true}/>
        <SignInButton text="Sign In" onPress={handleLogin}/>
      </View>
    </ScrollView>
    )
}

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
    },
    logo: {
      marginTop:'62%',
      padding:10,
      paddingHorizontal:40,
      fontFamily: 'American Typewriter'. serif,
      fontSize: 24,
      fontWeight:'bold',
      margin: 10,
    },
    input: {
        width: '80%',
    },
        forgotpassword: {
        fontWeight: 'bold',
        color: 'gray',
    },

    });
  
export default SignInScreen
