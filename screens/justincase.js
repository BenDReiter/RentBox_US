import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity, StyleSheet, Text, View, ImageBackground, Dimensions, KeyboardAvoidingView, TextInput } from 'react-native';
import React, {useState, Component} from 'react'
import background from '../images/yeeyee.jpg'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomInput from '../CustomInput';
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import SignInButton from '../SignInButton';
import { ScrollView } from 'react-native-gesture-handler';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { Formik } from 'formik';
import { auth } from '../firebase';
import Firebase from 'firebase'




function SignUpScreen({ navigation }) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user,setUser] = useState([
        {name:'TestName',email:'test@gmail.com',password:'testpassword'}
    ])

    const addUser = (user) => {
        setUser((currentUser) => {
            return[user,...currentUser]
        })
    }

    const handleSignUp = () => {
        auth.createUserWithEmailAndPassword(email,password).then(userCredentials => {
          const user = userCredentials.user;
        })
        .catch(error => alert(error.message))
        navigation.navigate("SignInScreen")
      }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Formik
            initialValues={{name:'', email:'', password:'',}}
            onSubmit={(values, actions) => {
                addUser(values)
                actions.resetForm()
                let ref1 = Firebase.database().ref('users').child('user').push()
                values.id = key
                ref1.set(values)
            }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <TextInput style={styles.input} 
                        placeholder='Name' 
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('name')}
                        value={props.values.name}
                        />
                        <TextInput style={styles.input} 
                        placeholder='Email'
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('email')}
                        value={props.values.email}
                        />
                        <TextInput style={styles.input} 
                        placeholder='Password'
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('password')}
                        value={props.values.password}
                        secureTextEntry
                        />
                        <TouchableOpacity style={styles.submitbutton} onPress={handleSignUp}>
                            <Text style={{color:'white'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
        </ScrollView>
    )
  }

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        marginTop:180,
    },
    logo: {
        marginTop:'50%',
        padding:10,
        paddingHorizontal:40,
        fontFamily: 'American Typewriter'. serif,
        fontSize: 24,
        fontWeight:'bold',
        justifyContent:'center',
        alignItems:'baseline',
    },
    input: {
        width: '80%',
    },
    forgotpassword: {
        fontWeight: 'bold',
        color: 'gray',
    },
    input: {
        marginTop:100,
        width:360,
        borderRadius:35,
        padding:16,
        backgroundColor:'white',
        marginTop:10,
        color:'black',
        backgroundColor:'#D3D3D3'
    },
    submitbutton: {
        padding:14,
        backgroundColor:'#3b71F3',
        borderRadius: 35,
        textAlign:'center',
        alignItems:'center',
        marginTop:10,
        width:360,
    }
});
  
  export default SignUpScreen