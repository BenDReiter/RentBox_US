import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import DeleteButton from '../DeleteButton'
import firebase from 'firebase'

const LeaseDetails = ({navigation,route}) => {
    const [showBox, setShowBox] = useState(true)

    const showConfirmDialog = () => {
        return Alert.alert(
          "Confirm Delete",
          "Are you sure you want to remove this property?",
          [
            // The "Yes" button
            {
              text: "Yes",
              onPress: () => {
                setShowBox(false);
                deleteLeases();
                navigation.navigate("Leases")
              },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
              text: "No",
            },
          ]
        );
    };
    async function deleteLeases(){
        await firebase.firestore().collection("Leases").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if(doc.data().address == route.params.address) {
                    firebase.firestore().collection("Leases").doc(doc.id).delete().then(()=> {
                        console.log("Doc deleted")
                    }).catch((error) => {
                        console.error("Error removing document", error)
                    })
                }
            })
        })
    }

    // async function deleteLeases(){
    //     const currentUserID = firebase.auth().currentUser.uid
    //     await firebase.firestore().collection("Leases").get().then((querySnapshot) => {
    //         querySnapshot.forEach((doc) => {
    //         if(doc.data().address == route.params.address) {
    //             firebase.firestore().collection("Leases").doc(doc.id).delete().then(() => {
    //             console.log("Doc Deleted")
    //             }).catch((error) => {
    //             console.error("Error removing document:", error)
    //             })
    //         }
    //         })
    //     })
    // }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{route.params.address}</Text>
            <Text style={styles.text}>{route.params.startdate}</Text>
            <Text style={styles.text}>{route.params.enddate}</Text>
            <DeleteButton text="Delete lease" onPress={showConfirmDialog} />
        </View>
    )
}

export default LeaseDetails

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text: {
        padding:18,
        borderRadius:35,
        borderColor:'black',
        borderWidth:1,
        width: 360,
        textAlign:'center',
    },
})