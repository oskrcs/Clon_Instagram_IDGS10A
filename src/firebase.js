import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// import 'firebase/storage';

// const firebaseApp = firebase.initializeApp({
//     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
//     apiKey: "AIzaSyCChkG_Mv-DQDGpSCF3Yp_FDwe2XfYCeSc",
//     authDomain: "clon-instagram-90405.firebaseapp.com",
//     databaseURL: "https://clon-instagram-90405-default-rtdb.firebaseio.com",
//     projectId: "clon-instagram-90405",
//     storageBucket: "clon-instagram-90405.appspot.com",
//     messagingSenderId: "1057693122212",
//     appId: "1:1057693122212:web:451a9c345f18768cdaf031",
//     measurementId: "G-1FV66JZTJB"
// });

// const db = firebaseApp.firestore();

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCChkG_Mv-DQDGpSCF3Yp_FDwe2XfYCeSc",
    authDomain: "clon-instagram-90405.firebaseapp.com",
    databaseURL: "https://clon-instagram-90405-default-rtdb.firebaseio.com",
    projectId: "clon-instagram-90405",
    storageBucket: "clon-instagram-90405.appspot.com",
    messagingSenderId: "1057693122212",
    appId: "1:1057693122212:web:451a9c345f18768cdaf031",
    measurementId: "G-1FV66JZTJB"
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };



// import { initializeApp } from 'firebase/app';

// // TODO: Replace the following with your app's Firebase project configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyCChkG_Mv-DQDGpSCF3Yp_FDwe2XfYCeSc",
//     authDomain: "clon-instagram-90405.firebaseapp.com",
//     databaseURL: "https://clon-instagram-90405-default-rtdb.firebaseio.com",
//     projectId: "clon-instagram-90405",
//     storageBucket: "clon-instagram-90405.appspot.com",
//     messagingSenderId: "1057693122212",
//     appId: "1:1057693122212:web:451a9c345f18768cdaf031",
//     measurementId: "G-1FV66JZTJB"
// };

// const app = initializeApp(firebaseConfig);
// const db = app.firestore();
// const auth = app.auth();
// const storage = app.storage();

// export { db, auth, storage };