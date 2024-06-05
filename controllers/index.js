import { onAuthChanged } from "./app.js";
import { logOut } from "./auth.js";

document.addEventListener("DOMContentLoaded", async () => {
  const menuDesplegable = document.querySelector(".menu-desplegable");
  const cerrarSesionBtn = document.querySelector('.cerrar-sesion-btn');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');

  
  function toggleCerrarSesion(sesionIniciada) {
    if (sesionIniciada) {
        cerrarSesionBtn.style.display = 'block'; 
    } else {
        cerrarSesionBtn.style.display = 'none'; 
    }
  }

  
  toggleCerrarSesion(false); 
  togglePerfil(false);
 
  cerrarSesionBtn.addEventListener('click', async () => {
    try {
      await logOut(); 
      toggleCerrarSesion(false); 
     
      alert('Se ha cerrado la sesión exitosamente.');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
  
    }
  });

   
    onAuthChanged((user) => {
        toggleCerrarSesion(user !== null); 
      });
    
  function togglePerfil(sesionIniciada) {
    const perfilBtn = document.querySelector('.perfil-btn');
    if (sesionIniciada) {
        perfilBtn.style.display = 'block'; 
    } else {
        perfilBtn.style.display = 'none'; 
    }
}

onAuthChanged((user) => {
    toggleCerrarSesion(user !== null); 
    togglePerfil(user !== null); 
});

  
  loginBtn.addEventListener('click', () => {
   
    window.location.href = '../templates/login.html';
  });

  
  registerBtn.addEventListener('click', () => {
   
    window.location.href = '../templates/register.html';
  });
  document.querySelector('.perfil-btn').addEventListener('click', () => {
    
    window.location.href = '../templates/perfil.html';
});

const catalogoItems = document.querySelectorAll('.catalogo .discount-item');

catalogoItems.forEach(item => {
  item.addEventListener('click', () => {
    
      const nombreIphone = item.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '');

      const nombreArchivo = nombreIphone.charAt(0).toUpperCase() + nombreIphone.slice(1);

      window.location.href = `../templates/${nombreArchivo}.html`;
  });
});

});

