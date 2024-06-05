import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';
import { collection, addDoc, getDocs , doc, getDoc, setDoc, deleteDoc, updateDoc, query, where } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBOscswkecJASf1VRibhLSKNWrvnWg-RMM",
    authDomain: "desarrollo-a-la-nube.firebaseapp.com",
    projectId: "desarrollo-a-la-nube",
    storageBucket: "desarrollo-a-la-nube.appspot.com",
    messagingSenderId: "326403613720",
    appId: "1:326403613720:web:19f119e0e1624178b00f6d",
    measurementId: "G-QN84ZMX30C"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    app,
    auth,
    db,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    setDoc,
    deleteDoc,
    updateDoc,
    signInWithEmailAndPassword,
    query,
    where,
  };