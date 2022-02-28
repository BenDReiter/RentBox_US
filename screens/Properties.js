import React, {useState, useEffect} from 'react'
import { View, Text, Modal, StyleSheet, FlatList,TouchableOpacity,TouchableWithoutFeedback, ActivityIndicator, Keyboard } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Formik } from 'formik'
import PropertiesForm from './PropertiesForm'
import PropertyDetails from '../screens/PropertyDetails'
import firebase from 'firebase'
import SignInButton from '../SignInButton'

function Properties({ navigation }){
    //const [loading, setLoading]  = useState(true)
    
    const [properties, setProperties] = useState([
        {address: '123 Test Address', bedrooms: 3, bathrooms:3,garagestalls:3,key:'1'}
    ])

    const [modalOpen, setModalOpen] = useState(false)


    const addProperty = (properties) => {
        setProperties((currentproperties) => {
            return[properties,...currentproperties]
        })
    }

    async function fetchProperties(){
        var propertyList = []
        const currentUserID = firebase.auth().currentUser.uid
        await firebase.firestore().collection("Properties").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().key == currentUserID) {
                    propertyList.push(doc.data())                }
            })
            setProperties(propertyList)
        })
        return () => fetchProperties();
    }

    useEffect(()=>{
        fetchProperties()
    }, [])

    return (
        <View style={styles.container}>
            <Modal visible={modalOpen} animationType='slide'>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                    <MaterialIcons
                    name='close'
                    size={24}
                    onPress={()=> setModalOpen(false)}
                    style={{...styles.modalToggle, ...styles.modalClose}}
                    />
                    <PropertiesForm addProperty={addProperty}/>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
            <MaterialIcons
            name='add'
            size={24}
            onPress={()=> setModalOpen(true)}
            style={styles.modalToggle}
            />
            <View style={styles.container}>
                <FlatList
                data = {properties}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.address} onPress={() => navigation.navigate("PropertyDetails", item)}>
                        <Text style={styles.text}> {item.address} </Text>
                    </TouchableOpacity>
                )}
                />

            </View>
    </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    address: {
        marginTop:10,
        borderRadius:35,
        padding:16,
        width:360, 
        textAlign:'center',
        backgroundColor:'white',
    },
    text: {
        textAlign:'center'
    },
    submitButton: {
        width:360,
        borderRadius:35,
        backgroundColor:'#3b71F3',
        marginTop:10,
        padding:14,
        marginBottom:20,
    },
    modalToggle: {
        marginBottom:10,
        borderWidth:2,
        borderColor:'black',
        padding:10,
        borderRadius:10,
        alignSelf:'center',
        marginTop:20,
    },
    modalClose: {
        marginTop:30,
        marginBottom:0,
    },
    modalContent: {
        flex:1,
    }
})
export default Properties
