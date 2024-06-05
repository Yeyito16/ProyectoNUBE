import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'

import { 
  getAuth,
  sendPasswordResetEmail
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js'

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

const recuperar = document.getElementById('btnRecover')

async function salvarpass()
{
    const usuario = document.getElementById('email').value

    try {
      await sendPasswordResetEmail(auth, usuario);
      alert('Password recovery email sent successfully to ' + usuario);
      window.location.href = 'recoverypass.html';
  } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      
  }
}

window.addEventListener('DOMContentLoaded', () => {
  recuperar.addEventListener('click', salvarpass);
});