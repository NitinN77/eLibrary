import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0_ODsO8mGpUBWwulVYeAG5QBWdkbw5cg",
    authDomain: "e-library-af799.firebaseapp.com",
    projectId: "e-library-af799",
    storageBucket: "e-library-af799.appspot.com",
    messagingSenderId: "155626648685",
    appId: "1:155626648685:web:b1235f7212068704edfb64",
    measurementId: "G-WX4WM85VFV"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};