import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import React, {Component} from 'react'
import background from '../images/yeeyee.jpg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



const login = () => {
    return (
        <View style = {{flex:1,height:height/3}}>
          <View style={StyleSheet.absoluteFill}>
            <View style={{height: height / 3, flex: 'flex-end', justifyContent:'center'}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('login')}>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>Sign In</Text>
                  <Stack.Screen name="Sign In" component={login}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('')}>
                  <Text style={{fontSize:20,fontWeight:'bold'}}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.forgotpassword}>
                  <TouchableOpacity>
                    <Text style={styles.forgotpassword}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
    )
}





const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backgroundContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      top: 0,
      left: 0,
    },
    button: {
      backgroundColor:'#D3D3D3',
      height: 55,
      marginHorizontal: 20,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:30,
    },
    forgotpassword: {
      alignItems:'center',
      justifyContent:'center',
      color: '#D3D3D3',
      padding: 10,
      fontSize: 20,
      fontWeight: 'bold',
    },
    title: {
      fontWeight:'bold',
      color: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default login



