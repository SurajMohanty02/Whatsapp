import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyABqL6KMoHd6qdvvH7ZumAZXrm7QVKnp74",
  authDomain: "whatsapp-clone-fd9a7.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-fd9a7.firebaseio.com",
  projectId: "whatsapp-clone-fd9a7",
  storageBucket: "whatsapp-clone-fd9a7.appspot.com",
  messagingSenderId: "127764667021",
  appId: "1:127764667021:web:cf9b08d15672f11c8e20c4",
  measurementId: "G-FWK25SRV88",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
