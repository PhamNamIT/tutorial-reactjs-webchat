import firebase from "firebase/compat/app";

import "firebase/compat/auth";
import "firebase/compat/analytics";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvv6RkfqCjqfwByYtBid0__awgzd32JNM",
  authDomain: "chat-app-44478.firebaseapp.com",
  projectId: "chat-app-44478",
  storageBucket: "chat-app-44478.appspot.com",
  messagingSenderId: "1059907025549",
  appId: "1:1059907025549:web:570c4ea03b69bb8e5000c4",
  measurementId: "G-3ZBQPLS7Z9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

auth.useEmulator('http://localhost:9099');
if (window.location.hostname === 'localhost') {
  db.useEmulator('localhost', '8080');
}

export { auth, db };
export default firebase;