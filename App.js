import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import React, {Component} from 'react'
import background from './images/yeeyee.jpg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen';
import ForgotPassword from './screens/ForgotPassword';
import LoggedInPage from './screens/LoggedInPage'
import ForgotPasswordpt2 from './screens/ForgotPasswordpt2';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Account from './screens/Account';
import Leases from './screens/Leases';
import Properties from './screens/Properties';
import 'react-native-gesture-handler';
import { auth } from './firebase';
import SignOutPage from './screens/SignOutPage';
import PropertiesForm from './screens/PropertiesForm';
import PropertyDetails from './screens/PropertyDetails';
import SignInScreenTwo from './screens/SignInScreenTwo';
import { AuthProvider } from './AuthProvider';
import WelcomeScreen from './screens/WelcomeScreen'
import LeaseDetails from './screens/LeaseDetails'
import LeaseForm from './screens/LeaseForm';

const {width, height} = Dimensions.get('window')


function HomeScreen({ navigation }) {
  return (
    <View style = {{flex:1,height:height/3}}>
    <View style={StyleSheet.absoluteFill}>
      <ImageBackground source={background} style={styles.backgroundContainer}>
      </ImageBackground>
      <View style={{height: height / 3, flex: 'flex-end', justifyContent:'center'}}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignInScreen')}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={{fontSize:20,fontWeight:'bold'}}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.forgotpassword}>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword2')}>
              <Text style={styles.forgotpassword}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  </View>
  );
}

const handleSignOut = ({ navigation }) => {
  auth.signOut().then(()=> {
      navigation.replace("Home")
  })
  .catch(error => alert(error.message))
}


const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function SignedInTabs() {
  return (
  <Drawer.Navigator initialRouteName="LoggedInPage">
    <Drawer.Screen name="Account" component={Account} />
    <Drawer.Screen name="Leases" component={Leases} />
    <Drawer.Screen name="Properties" component={Properties} />
    <Drawer.Screen name="Sign Out" component={SignOutPage} />
  </Drawer.Navigator>
  )
}

function App({ navigation }) {

  return (
    <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name ="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name = "ForgotPassword2" component={ForgotPasswordpt2} />
        <Stack.Screen name = "LoggedInPage" component={SignedInTabs} />
        <Stack.Screen name ="PropertiesForm" component={PropertiesForm} />
        <Stack.Screen name ="PropertyDetails" component={PropertyDetails} />
        <Stack.Screen name ="LeaseDetails" component={LeaseDetails} />
        <Stack.Screen name ="LeaseForm" component={LeaseForm} />
       </Stack.Navigator>
    </NavigationContainer>
    </AuthProvider>
  );
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
    width: width,
    height: height,
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
  },
  propertiesform: {
    color:'white',
  }
});


export default App;