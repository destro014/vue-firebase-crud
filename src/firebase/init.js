import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase

var firebaseConfig = {
  apiKey: "AIzaSyAP48LDE-oP8jHLov-ZwzEVqFok7LJ0ny0",
  authDomain: "vue-firebase-crud-e1355.firebaseapp.com",
  databaseURL: "https://vue-firebase-crud-e1355.firebaseio.com",
  projectId: "vue-firebase-crud-e1355",
  storageBucket: "vue-firebase-crud-e1355.appspot.com",
  messagingSenderId: "648276205911",
  // appId: "1:648276205911:web:fb2fd8726200df00"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()
