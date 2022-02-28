import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const ForgotPasswordButton = ({onPress, text}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} 
            style = {[
                styles.button,
            ]}>
                <Text style = {{fontSize:20, fontWeight:'bold'}}>{text}</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    button: {
        backgroundColor:'#D3D3D3',
        height: 55,
        marginHorizontal: 20,
        borderRadius: 35,
        marginTop:30,
        textAlign:'center',
    }
})

export default ForgotPasswordButton
