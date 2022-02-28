import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'
import firebase from 'firebase'
import SignInButton from '../SignInButton'
import { MaterialIcons } from '@expo/vector-icons'
import LeaseForm from './LeaseForm'
import DeleteButton from '../DeleteButton'
const Leases = ({ navigation }) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [leases, setLeases] = useState([
        {address:'123 Sample Lease Address' , startdate:'', enddate:'',key:'1'}
    ])

    const addLeases = (leases) => {
        setLeases((currenLeases) => {
            return [leases,...currenLeases]
        })
    }

    async function fetchLeases(){
        var leaseList = []
        const currentUserID = firebase.auth().currentUser.uid
        await firebase.firestore().collection("Leases").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().key == currentUserID) {
                    leaseList.push(doc.data())
                    console.log(leaseList)
                }
            })
            setLeases(leaseList)
        })
        return () => fetchLeases();
    }

    useEffect(()=>{
        fetchLeases()
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
                    <LeaseForm addLease={addLeases}/>
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
                data = {leases}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.address} onPress={() => navigation.navigate("LeaseDetails", item)}>
                        <Text style={styles.text}> {item.address} </Text>
                    </TouchableOpacity>
                )}
                />
            </View>
    </View>
    )
}

export default Leases

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