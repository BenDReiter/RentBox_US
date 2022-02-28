import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import Firebase from 'firebase'
const PropertiesForm = ({ addProperty }) => {

    const [property, setProperty] = useState('')

    const database = Firebase.database()

    const id = Firebase.auth().currentUser.uid;

    return (

        <View style={styles.container}>
            <Formik
            initialValues={{address: '', bedrooms:'', bathrooms:'', garagestalls:'',key:id}}
            onSubmit={(values, actions) => {
                addProperty(values)
                actions.resetForm()
                Firebase.firestore().collection("Properties").add(values)
                values.id= Firebase.auth().currentUser.uid
            }}
            >
                {(props) => (
                    <View style={styles.container}>
                        <TextInput style={styles.input} 
                        placeholder='Enter Home Address' 
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('address')}
                        value={props.values.address}
                        />
                        <TextInput style={styles.input} 
                        placeholder='Enter Number of Bedrooms' 
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('bedrooms')}
                        value={props.values.bedrooms}
                        keyboardType='numeric'
                        />
                        <TextInput style={styles.input} 
                        placeholder='Enter Number of Bathrooms'
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('bathrooms')}
                        value={props.values.bathrooms}
                        keyboardType='numeric'
                        />
                        <TextInput style={styles.input} 
                        placeholder='Enter Number of Garage Stalls'
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('garagestalls')}
                        value={props.values.garagestalls}
                        keyboardType='numeric'
                        />
                        <TouchableOpacity style={styles.submitbutton} onPress={props.handleSubmit}>
                            <Text style={{color:'white'}}>Submit</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </View>
    )
}

export default PropertiesForm

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',
    },
    input: {
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
})
