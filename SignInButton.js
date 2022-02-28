import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const SignInButton = ({text, onPress,style}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style = {[
            styles.container
        ]}>
            <Text 
             style = {
                 styles.text
                 } >{text}
             </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3b71F3',
        width: 380,
        padding:16,
        marginTop:12,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:35,
        paddingHorizontal:50,
        position: 'relative',
        marginVertical:10,
    },

    container_PRIMARY: {

    },
    text: {
        fontWeight:'bold',
        color: 'white',
    },
    text_SECONDARY: {

    }
})


export default SignInButton
