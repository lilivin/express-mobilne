import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA3qQ1Ujg5xRFI7myjVTFKXXXc3AcEijpo",
    authDomain: "reactnative-bc00d.firebaseapp.com",
    projectId: "reactnative-bc00d",
    storageBucket: "reactnative-bc00d.appspot.com",
    messagingSenderId: "130887002216",
    appId: "1:130887002216:web:6da2b0fb648765012673dd",
    measurementId: "G-BMDK68L4PB"
  };


if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export { firebase };