import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, FlatList,TouchableOpacity, Alert, Touchable } from 'react-native'
import SignUpScreen from './SignUpScreen'
import firebase from 'firebase'

const Account = ({ navigation }) => {

    const [email,setEmail] = useState('')

    useEffect(() => {
        const userEmail = firebase.auth().currentUser.email
        setEmail(userEmail)
    })

    function passwordResetEmail(){
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
            Alert.alert("Password Reset Email Sent")
        }).catch((error) => {
            var errorCode = error.code
            var errorMessage = error.message
        })
    }

    return  (
        <View style={styles.container}>
            <TouchableOpacity style={styles.email}>
                <Text style={{fontSize:16}}>Email: {email}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.email} onPress={() => passwordResetEmail()}>
                <Text style={{fontSize:16}}>Send Password Reset Email</Text>
            </TouchableOpacity>
        </View>
    )
    }


const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
    },
    email : {
        marginTop:10,
        padding:16,
        borderColor: 'black',
        borderWidth:1,
        backgroundColor:'white',
        width: '100%'
    }
})

export default Account
