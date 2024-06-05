import { db } from '../controllers/db/database.js';
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js';

const auth = getAuth();

async function mostrarInformacionUsuario(uid) {
    try {
        const usuarioRef = doc(db, "users", uid);
        const usuarioSnap = await getDoc(usuarioRef);
        if (usuarioSnap.exists()) {
            const usuarioData = usuarioSnap.data();
            const cardUsuario = document.getElementById("card-usuario");
            cardUsuario.innerHTML = `
                <div class="card">
                    <h2>Información del Usuario</h2>
                    <p><strong>Nombre:</strong> ${usuarioData.nombre}</p>
                    <p><strong>Correo electrónico:</strong> ${usuarioData.email}</p>
                    <p><strong>Teléfono:</strong> ${usuarioData.telefono}</p>
                    <p><strong>Dirección:</strong> ${usuarioData.direccion}</p>
                    <p><strong>Fecha de nacimiento:</strong> ${usuarioData.fecha}</p>
                    <!-- Botón para actualizar datos -->
                    <button id="update-button">Actualizar Datos</button>
                </div>
            `;

            document.getElementById("update-button").addEventListener("click", () => {
      
                cardUsuario.innerHTML += `
                    <div id="update-fields">
                        <h3>Actualizar Datos</h3>
                        <form id="update-form">
                            <p><strong>Nombre:</strong> <input type="text" id="new-nombre" value="${usuarioData.nombre}" required></p>
                            <p><strong>Correo electrónico:</strong> <input type="email" id="new-email" value="${usuarioData.email}" required></p>
                            <p><strong>Teléfono:</strong> <input type="text" id="new-telefono" value="${usuarioData.telefono}" required></p>
                            <p><strong>Dirección:</strong> <input type="text" id="new-direccion" value="${usuarioData.direccion}" required></p>
                            <p><strong>Fecha de nacimiento:</strong> <input type="text" id="new-fecha" value="${usuarioData.fecha}" required></p>
                            <button id="save-button" type="submit">Guardar Cambios</button>
                        </form>
                    </div>
                `;

 
                document.getElementById("update-form").addEventListener("submit", async (event) => {
                    event.preventDefault(); 
                    alert('Datos actualizados correctamente');

                    const nuevoNombre = document.getElementById("new-nombre").value;
                    const nuevoEmail = document.getElementById("new-email").value;
                    const nuevoTelefono = document.getElementById("new-telefono").value;
                    const nuevaDireccion = document.getElementById("new-direccion").value;
                    const nuevaFecha = document.getElementById("new-fecha").value;

                    try {
                        await updateDoc(usuarioRef, {
                            nombre: nuevoNombre,
                            email: nuevoEmail,
                            telefono: nuevoTelefono,
                            direccion: nuevaDireccion,
                            fecha: nuevaFecha
                        });

                        console.log("Datos actualizados exitosamente.");
                        
                    } catch (error) {
                        console.error("Error al actualizar los datos:", error);
                        
                    }
                });
            });
        } else {
            console.log("No se encontró el usuario en Firestore.");
        }
    } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            mostrarInformacionUsuario(user.uid);
        } else {
            console.log("No hay ningún usuario autenticado.");

        }
    });
});
