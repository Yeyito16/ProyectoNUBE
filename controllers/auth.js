
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Obtener la instancia de autenticación de Firebase
const auth = getAuth();

// Función para cerrar la sesión del usuario
async function logOut() {
  try {
    await signOut(auth); // Cerrar sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error; // Propagar el error para manejarlo en el lugar donde se llama a esta función
  }
}

export { logOut };