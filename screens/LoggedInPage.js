import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { auth } from '../firebase'

const LoggedInPage = ({ navigation }) => {

    const handleSignOut = () => {
        auth.signOut().then(()=> {
            navigation.replace("Home")
        })
        .catch(error => alert(error.message))
    }
    return (
        <View style = {{flex: 1, justifyContent:'center',alignItems:'center'}}>
            <Text>Hello World</Text>
            <TouchableOpacity onPress={handleSignOut} style= {styles.signOutButton}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
})

export default LoggedInPage
