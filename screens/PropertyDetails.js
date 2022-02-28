import React, {useState, useEffect, useCallback} from 'react'
import { RefreshControl, StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native'
import firebase from 'firebase'
import SignInButton from '../SignInButton'
import * as ImagePicker from 'expo-image-picker'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import DeleteButton from '../DeleteButton'



const PropertyDetails = ({navigation,route}) => {
    const [pickedImagePath, setPickedImagePath] = useState('');
    const [image,setImage] = useState();
    const [url,setUrl] = useState()
    const [showBox, setShowBox] = useState(true)
        const [refreshing, setRefreshing] = useState(false)

    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
      // Ask the user for the permission to access the media library 
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync();
  
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
      }
    }

    const openCamera = async () => {
      // Ask the user for the permission to access the camera
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }
  
      const result = await ImagePicker.launchCameraAsync();
  
      // Explore the result
      console.log(result);
  
      if (!result.cancelled) {
        setPickedImagePath(result.uri);
        uploadImage(result.uri);
      }
    }

      
    const uploadImage = async(uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();

      var ref = firebase.storage().ref(route.params.address).child('Images' + Math.random())
      return ref.put(blob)
    }

    async function fetchPictures() {
        await firebase.storage().ref().child(route.params.address).list().then(result => {
            // Loop over each item
            result.items.forEach(pics => {
                firebase.storage().ref().child(pics.fullPath).getDownloadURL().then((url) => {
                    data.push(url)
                    console.log(data)
                })
            });
        })
    }

    const onRefresh = useCallback(async () => {
      await firebase.storage().ref().child(route.params.address).list().then(result => {
        // Loop over each item
        result.items.forEach(pics => {
            firebase.storage().ref().child(pics.fullPath).getDownloadURL().then((url) => {
                data.push(url)
            })
        });
    })
    },[refreshing])

    async function deleteProperties(){
      const currentUserID = firebase.auth().currentUser.uid
      await firebase.firestore().collection("Properties").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.data().address == route.params.address) {
              firebase.firestore().collection("Properties").doc(doc.id).delete().then(() => {
                console.log("Doc Deleted")
              }).catch((error) => {
                console.error("Error removing document:", error)
              })
            }
          })
      })
    }

    var data = [
        'https://firebasestorage.googleapis.com/v0/b/sandbox-337315.appspot.com/o/Rentbox3.JPG?alt=media&token=55418aba-093d-4c3d-909d-2a30f1530911',
    ]

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
              deleteProperties();
              navigation.navigate("Properties")
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
    return (
      <ScrollView
      refreshControl={
        <RefreshControl refreshing = {refreshing} onRefresh={onRefresh} />
      }
      >
                <View style={styles.container}>
            <FlatList
            style={styles.flatlist}
            showsHorizontalScrollIndicator={false}
            data = {data}
            horizontal={true}
            keyExtractor={(item,index) => index.toString()}
            renderItem={({item}) => {
                return <View style={{flex:1,backgroundColor:'white'}}>
                    <Image source={{uri: item}} style={styles.image}/>
                </View>
            }}
            />
            <Text style={styles.text}>Address: {route.params.address}</Text>
            <Text style={styles.text}>Bedrooms: {route.params.bedrooms}</Text>
            <Text style={styles.text}>Bathrooms: {route.params.bathrooms}</Text>
            <Text style={styles.text}>Garage Stalls: {route.params.garagestalls}</Text>
            <SignInButton style={styles.button} text="Add Photos" onPress={openCamera}/>
            <DeleteButton text="Delete Property" onPress={() => showConfirmDialog()}/>
        </View>
      </ScrollView>
    )
}

export default PropertyDetails

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    text: {
        padding:14,
        borderRadius:35,
        borderColor:'#DDD',
        borderWidth:1,
        width: 360,
        textAlign:'center',
    },
    image: {
        width: 300,
        height: 600,
        resizeMode: 'cover',
        paddingHorizontal:10,
        marginTop:10,
        backgroundColor:'white'
      },
      flatlist: {
          marginTop:20,
      },

      deleteproperty: {
        backgroundColor: '#f54248',
        padding:16,
      },
})
