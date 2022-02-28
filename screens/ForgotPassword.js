import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, Dimensions, TextInput,KeyboardAvoidingView } from 'react-native';
import React, {Component} from 'react'
import background from '../images/yeeyee.jpg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { backgroundColor, borderLeftColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import CustomInput from '../CustomInput';
import { useState } from 'react/cjs/react.development';
import CustomButton from '../CustomButton';
import SignInButton from '../SignInButton';
import { auth } from '../firebase';
import EmailInput from '../EmailInput';
import ForgotPasswordButton from '../ForgotPasswordButton';

const ForgotPassword = ({ navigation }) => {

    const handleForgotPassword = () => {
        auth.sendPasswordResetEmail(email)
        .then(() => {
            navigation.replace("Home");
            console.log("Password Reset Email Sent");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
    };


    return (
        <View style={styles.container}>
            <View style={styles.container}>
            <EmailInput placeholder="Enter your E-mail" value={email} setValue={setEmail} text="Reset your Password" onPress={handleForgotPassword} />
            <TouchableOpacity onPress={handleForgotPassword}>
                <Text>Reset your password</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
    },
    logo: {
        padding:10,
        fontFamily: 'American Typewriter'. serif,
        fontSize: 24,
        fontWeight:'bold',
        margin: 10,
    },
    fpbutton: {
        width:'70%',
        backgroundColor:'#D3D3D3',
        borderRadius:35,
        padding:14,

    },
    forgotpassword : {
        color: 'black',
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign:'center',

    }
})

export default ForgotPassword
