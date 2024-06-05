import { onAuthChanged } from "./app.js";
import { logOut } from "./auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  const menuDesplegable = document.querySelector(".menu-desplegable");
  const cerrarSesionBtn = document.querySelector('.cerrar-sesion-btn');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');

  // Función para mostrar u ocultar el botón de cerrar sesión.
  function toggleCerrarSesion(sesionIniciada) {
    if (sesionIniciada) {
        cerrarSesionBtn.style.display = 'block'; // Muestra el botón.
    } else {
        cerrarSesionBtn.style.display = 'none'; // Oculta el botón.
    }
  }

  // Llama a la función para establecer la visibilidad inicial del botón.
  toggleCerrarSesion(false); // Suponiendo que inicialmente no hay sesión iniciada.
  togglePerfil(false);
  
  // Agrega un event listener al botón de cerrar sesión para ocultarlo cuando se haga clic.
  cerrarSesionBtn.addEventListener('click', async () => {
    try {
      await logOut(); // Cerrar sesión
      toggleCerrarSesion(false); // Oculta el botón de cerrar sesión
      // Mostrar mensaje de que la sesión se cerró exitosamente
      alert('Se ha cerrado la sesión exitosamente.');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      // Manejar errores aquí, si es necesario
    }
  });

    // Observa el estado de autenticación y actualiza la visibilidad del botón de cerrar sesión.
    onAuthChanged((user) => {
        toggleCerrarSesion(user !== null); // Si hay un usuario autenticado, muestra el botón de cerrar sesión.
      });
    
  function togglePerfil(sesionIniciada) {
    const perfilBtn = document.querySelector('.perfil-btn');
    if (sesionIniciada) {
        perfilBtn.style.display = 'block'; // Muestra el botón.
    } else {
        perfilBtn.style.display = 'none'; // Oculta el botón.
    }
}

onAuthChanged((user) => {
    toggleCerrarSesion(user !== null); // Si hay un usuario autenticado, muestra el botón de cerrar sesión.
    togglePerfil(user !== null); // Si hay un usuario autenticado, muestra el botón de perfil.
});

  // Agregar evento al botón de inicio de sesión
  loginBtn.addEventListener('click', () => {
    // Redirigir a la página de inicio de sesión (login.html)
    window.location.href = '../templates/login.html';
  });

  // Agregar evento al botón de registro
  registerBtn.addEventListener('click', () => {
    // Redirigir a la página de registro (register.html)
    window.location.href = '../templates/register.html';
  });
  document.querySelector('.perfil-btn').addEventListener('click', () => {
    // Redirigir a la página de perfil (perfil.html)
    window.location.href = '../templates/perfil.html';
});

const catalogoItems = document.querySelectorAll('.catalogo .discount-item');
// Agregar evento de clic a cada elemento del catálogo
catalogoItems.forEach(item => {
  item.addEventListener('click', () => {
      // Obtener el nombre del iPhone del texto del elemento h3
      const nombreIphone = item.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '');
      // Ajustar la primera letra a mayúscula
      const nombreArchivo = nombreIphone.charAt(0).toUpperCase() + nombreIphone.slice(1);
      // Redirigir a la página correspondiente
      window.location.href = `../templates/${nombreArchivo}.html`;
  });
});

});

