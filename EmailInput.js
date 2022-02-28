import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

const EmailInput = ({value, setValue, placeholder}) => {
    return (
        <View style={styles.container}>
            <TextInput
            style={styles.emailinput}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:3,
        alignItems:'center',
        justifyContent:'center',
    },
    emailinput: {
        padding:14,
        borderRadius:35,
        backgroundColor:'white',
        width:360,
    },
    fpbutton: {
        width:'70%',
        backgroundColor:'#D3D3D3',
        borderRadius:35,
        padding:14,
    }
})


export default EmailInput
