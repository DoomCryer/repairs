import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCQSKHzmwHKcvA4xXkNkdJsSTwhoGblwVM",
  authDomain: "repair-bb0d9.firebaseapp.com",
  databaseURL: "https://repair-bb0d9.firebaseio.com",
  projectId: "repair-bb0d9",
  storageBucket: "repair-bb0d9.appspot.com",
  messagingSenderId: "289410284796",
  appId: "1:289410284796:web:11c231fc92f1faa10eeb79"
};

firebase.initializeApp(config);
const db = firebase.firestore();
// const itemsCollection = firebase.database().ref("items");
const itemsCollection = db.collection("items");

export default { db, itemsCollection };
