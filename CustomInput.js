import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomInput = ({icon, value, setValue, placeholder, secureTextEntry, fgColor}) => {
    return (
        <View style={styles.container}>
            <TextInput
            value = {value}
            onChangeText={setValue}
            placeholder={placeholder}
            style = {styles.input} 
            secureTextEntry = {secureTextEntry}
            />
            <Ionicons 
            name = {icon} 
            size={20} 
            color={fgColor} 
            style= {styles.icon}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection:'row-reverse',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding:14,
        borderRadius:35,
        backgroundColor:'white',
        width:360,
        marginVertical:10,

      },
    icon: {
        padding: 4,
    }
})

export default CustomInput
