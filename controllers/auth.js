
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const auth = getAuth();
async function logOut() {
  try {
    await signOut(auth); 
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; 
  }
}

export { logOut };