import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase

var firebaseConfig = {
  apiKey: "",
  authDomain: "vue-firebase-crud-e1355.firebaseapp.com",
  databaseURL: "https://vue-firebase-crud-e1355.firebaseio.com",
  projectId: "vue-firebase-crud-e1355",
  storageBucket: "vue-firebase-crud-e1355.appspot.com",
  messagingSenderId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebaseApp.firestore().settings({ timestampsInSnapshots: true })

// export firestore database
export default firebaseApp.firestore()
