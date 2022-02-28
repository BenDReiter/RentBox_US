import React, {useState, useEffect} from 'react'
import { ActivityIndicator, FlatList, View, Text } from 'react-native'
import firebase from 'firebase'

function newProperties({ navigation }) {
    const [loading, setLoading] = useState(true)
    const [properties,setProperties] = useState([])

    useEffect(()=> {
        const property = Firebase.firestore().collection('users').onSnapshot(querySnapshot => {
            const properties = []

            querySnapshot.forEach(documentSnapshot => {
                properties.push({...documentSnapshot.data(),
                key: documentSnapshot.id 
            })
            })

            setProperties(properties);
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <ActivityIndicator/>
    }

    return (
        <FlatList
        data = {properties}
        renderItem={({item}) => (
            <View style= {{flex:1, justifyContent:'center',alignItems:'center'}}>
                <Text> Address: {item.address}</Text>
            </View>
        )} />
    )
}