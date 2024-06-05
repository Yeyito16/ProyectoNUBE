import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js'
import {collection, addDoc, getDocs , doc, getDoc, setDoc, getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import { } from './db/database.js'; 


import {
  getAuth,
  signOut,
  deleteUser,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

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
const db = getFirestore();

export {
  deleteUser
};

export {
  app,
  auth,
  sendEmailVerification,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc
};

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();

export const signInPopup = (provider) => signInWithPopup(auth, provider);

export const sendEmailToResetPassword = async (email) => sendPasswordResetEmail(auth, email)
//export const sendEmail = async (auth, user) => sendEmailVerification(user);
export const logOut = async () => signOut(auth);

export const loginvalidation = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid; // Utilizar el ID proporcionado en lugar del UID

    // Buscar el documento del usuario por el ID
    const userDoc = await getDoc(doc(db, "users", uid));

    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('Datos del usuario:', userData);
      return {
        user: {
          uid: user.uid,
          email: user.email,
          role: userData.role
        }
      };
    } else {
      console.error("Documento del usuario no encontrado:", uid);
      throw new Error("No se encontró el documento del usuario.");
    }
  } catch (error) {
    console.error("Error en loginvalidation:", error);
    throw error;
  }
};

export const createUserEmailPassword = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = async (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginWithFacebook = async (email, password) =>createUserWithEmailAndPassword(auth, email, password);

export const onAuthChanged = (user) => onAuthStateChanged(auth, user);

export const deleteCurrentUser = async () => auth.currentUser.delete();

export const registerUser = async (email, id, password , nombre, direccion, telefono, fecha) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obtener el uid del usuario
    const uid = user.uid;

    // Crear el documento del usuario con uid
    await setDoc(doc(db, "users", uid), {
      id: id,
      email: email,
      nombre: nombre,
      direccion: direccion,
      telefono: telefono,
      fecha: fecha,
      role: 'user',
      uid: uid // Agregar uid al documento del usuario
    });

    console.log('Documento del usuario creado con UID:', uid);
    return user;
  } catch (error) {
    throw error;
  }
};

export const searchReg=(id)=>
  getDoc(doc(db,"users",id))

//Consultar registros
export const realusers=()=>
  getDocs(collection(db, "users"));
