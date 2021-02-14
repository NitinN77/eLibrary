import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyADDxpfjFxALuNpe_9f5hxBw9LiszhPA44",
    authDomain: "beast-store.firebaseapp.com",
    projectId: "beast-store",
    storageBucket: "beast-store.appspot.com",
    messagingSenderId: "1048325030500",
    appId: "1:1048325030500:web:c05975d79f04c1f9be5571",
    measurementId: "G-S9LQPSHCC6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};