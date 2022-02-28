import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import firebase from 'firebase'
import CustomInput from '../CustomInput'
import SignInButton from '../SignInButton'
import { auth } from '../firebase';


const AddUser = ({ navigation }) => {


    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    function addUser(){
        var user = {
            "name": name,
            "email": email,
            "password":password,
        }
        addNewUser(addUser, addComplete)
    }
    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email,password).then(userCredentials => {
          const user = userCredentials.user;
        })
        .catch(error => alert(error.message))
    }

    function addComplete(){
        navigation.navigate("SignInScreen")
    }

    function addNewUser(user){
        firebase.firestore().collection('users').add(user).then((snapshot) => {
            user.id = snapshot.id
            snapshot.set(user)
        })
        .catch((error)=>console.log(error))
    }

    function createAccountPressHandler(){
        addUser();
        navigation.replace("LoggedInPage");
        handleSignUp();
    }


    return (
        <View style={styles.container}>
            <TextInput placeholder="Name" style={styles.userInput} value={name} onChangeText={text => setName(text)} />
            <TextInput placeholder="Email" style={styles.userInput} value={email} onChangeText={text => setEmail(text)} />
            <TextInput placeholder="Password" style={styles.userInput} value={password} onChangeText={text => setPassword(text)} secureTextEntry/>
            <SignInButton text="Create Account" onpress={()=> createAccountPressHandler()}/>
        </View>
    )
}

export default AddUser

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    userInput: {
        padding: 14,
        backgroundColor:'white',
        width: 360,
        borderRadius:35,
        marginTop:10,
    }
})
