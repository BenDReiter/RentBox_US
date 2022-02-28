import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import Firebase from 'firebase'

const LeaseForm = ({addLease}) => {

    const [lease, setLease] = useState('')


    const id = Firebase.auth().currentUser.uid

    return (

        <View style={styles.container}>
            <Formik
            initialValues={{address: '', startdate:'', enddate:'',key:id}}
            onSubmit={(values, actions) => {
                addLease(values)
                actions.resetForm()
                Firebase.firestore().collection("Leases").add(values)
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
                        placeholder='Enter Start Date (MM/DD/YYYY)' 
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('startdate')}
                        value={props.values.startdate}
                        />
                        <TextInput style={styles.input} 
                        placeholder='Enter End Date (MM/DD/YYYY)'
                        placeholderTextColor='black'
                        onChangeText={props.handleChange('enddate')}
                        value={props.values.enddate}
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


export default LeaseForm

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
