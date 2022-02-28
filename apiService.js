import firebase from "firebase";

export const fetchProperties = async () => {
    const properties = new Array()
    const querySnapshot = await firebase.firestore().collection('DanceMoves').orderBy('createdAt').get()
    querySnapshot.forEach((doc) => {
        let propertyData = doc.data();
        propertyData.postId = doc.id;
        properties.push(propertyData)
    })
    return{properties}
}
export const fetchUsers = async () => {
    const properties = new Array()
    const querySnapshot = await firebase.firestore().collection('users').orderBy('createdAt').get()
    querySnapshot.forEach((doc) => {
        let propertyData = doc.data();
        propertyData.postId = doc.id;
        properties.push(propertyData)
    })
    return{properties}
}