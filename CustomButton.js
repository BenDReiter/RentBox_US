import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar'
import Expo from 'expo';

const CustomButton = ({icon, onPress, text, bgColor, fgColor}) => {
    return (
        <Pressable onPress={onPress}
        style = {[
            styles.container,
            bgColor ? {backgroundColor: bgColor} : {},
        ]}>
        < AntDesign name = {icon} size={24} color={fgColor} style={styles.icon}/>
            <Text 
             style = {
                 styles.text,
                 fgColor ? {color: fgColor} : {}
                 } >{text}
             </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3b71F3',
        width: '80%',
        padding:12,
        marginTop:12,
        alignItems:'center',
        borderRadius:10,
        flexDirection: 'row',
        paddingHorizontal:80,
        justifyContent:'center',
        alignItems:'center',
    },

    container_PRIMARY: {

    },
    text: {
        fontWeight:'bold',
        color: 'white',
        fontSize: 20,
    },
    icon: {
        marginRight:10,
        justifyContent:'space-evenly'
    }
})

export default CustomButton
