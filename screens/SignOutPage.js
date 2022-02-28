import React, { useState } from "react";
import { View, StyleSheet, Button, Alert, Text } from "react-native";
import SignInButton from "../SignInButton";
import { auth } from "../firebase";

const SignOutPage = ({ navigation }) => {
    const handleSignOut = () => {
        auth.signOut().then(()=> {
            navigation.replace("Home")
        })
        .catch(error => alert(error.message))
    }
  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Are you sure you want to Sign Out?</Text>
        <SignInButton text="Sign Out" onPress={handleSignOut}/>
        <SignInButton text="Cancel" onPress={()=> navigation.navigate("Account")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  logo : {
    padding:10,
    fontFamily: 'American Typewriter'. serif,
    fontSize: 18,
    fontWeight:'bold',
    alignItems:'baseline',
    color:'black',
  }
});

export default SignOutPage;