import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, Dimensions, KeyboardAvoidingView } from 'react-native';
import React, {useState, Component} from 'react'
import background from '../images/yeeyee.jpg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomInput from '../CustomInput';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import SignInButton from '../SignInButton';
import { ScrollView } from 'react-native-gesture-handler';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Formik } from 'formik';
import { auth } from '../firebase';




function SignUpScreen({ navigation }) {


    const [firstname,setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('')

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email,password).then(userCredentials => {
          const user = userCredentials.user;
        })
        .catch(error => alert(error.message))
      }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style ={styles.container}>
                    <KeyboardAvoidingView>
                            <Text style = {styles.logo}>Create Account</Text>
                            <CustomInput icon = "person-outline" placeholder="First Name" value= {firstname} setValue= {setFirstName} secureTextEntry={false}/>
                            <CustomInput icon = "person-outline" placeholder="Last Name" value= {lastname} setValue= {setLastName} secureTextEntry={false}/>
                            <CustomInput icon = "mail-outline" placeholder="Email" value= {email} setValue= {setEmail} secureTextEntry={false}/>
                            <CustomInput icon = "lock-closed-outline" placeholder="Password" value= {password} setValue= {setPassword} secureTextEntry={true}/>
                            <SignInButton text="Create Account" onPress={handleSignUp}/>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </ScrollView>
    )
  }

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    logo: {
        marginTop:'50%',
        padding:10,
        paddingHorizontal:40,
        fontFamily: 'American Typewriter'. serif,
        fontSize: 24,
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'baseline',
    },
    input: {
        width: '80%',
    },
    forgotpassword: {
        fontWeight: 'bold',
        color: 'gray',
    },
});
  
  export default SignUpScreen