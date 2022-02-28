// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf7GADckeCeibkL--SIMwNKa5QlEZjB2Q",
  authDomain: "sandbox-337315.firebaseapp.com",
  projectId: "sandbox-337315",
  storageBucket: "sandbox-337315.appspot.com",
  messagingSenderId: "345598369537",
  appId: "1:345598369537:web:47cd81a191b9728ff5c500",
  measurementId: "G-TJG7E23402"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()
var provider = new firebase.auth.GoogleAuthProvider();



export {auth, provider};