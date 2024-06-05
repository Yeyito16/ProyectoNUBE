import { auth } from "./app.js";
import {  getAllBikes } from "./db/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  const catalogoContainer = document.getElementById("catalogo-container");
  const carouselTrack = document.getElementById("carousel-track");
  const profileSection = document.getElementById("profile-section");
  const cerrarSesionBtn = document.querySelector('.cerrar-sesion-btn');

  await getAllBikes().then((bikes) => {
    bikes.forEach((bike) => {
      let bikeData = bike.data();
      let bikeId = bike.id; 
      carouselTrack.innerHTML += `
        <a href="./templates/details.html?bikeId=${bikeId}" class="carousel-slide">
            <div class="carousel-content">
                <img src="${bikeData.picture && bikeData.picture.trim() !== "" ? bikeData.picture : "../resources/images/imgini.png"}" alt="bicicleta">
                <h3>${bikeData.bikeName}</h3>
                <h4>Descripcion: ${bikeData.description}</h4>
                <h5>precio hora: ${bikeData.pricePerHour}</h5>
                <h5>precio dia: ${bikeData.pricePerDay}</h5>
                <h5>precio semana: ${bikeData.pricePerWeek}</h5>
            </div>
        </a>
      `;
      catalogoContainer.innerHTML += `
        <a href="./templates/details.html?bikeId=${bikeId}" class="catalogo-item">
            <img src="${bikeData.picture && bikeData.picture.trim() !== "" ? bikeData.picture : "../resources/images/imgini.png"}" alt="bicicleta">
            <h3>${bikeData.bikeName}</h3>
            <h4>Descripcion: ${bikeData.description}</h4>
            <h5>precio hora: ${bikeData.pricePerHour}</h5>
            <h5>precio dia: ${bikeData.pricePerDay}</h5>
            <h5>precio semana: ${bikeData.pricePerWeek}</h5>
        </a>
      `;
    });
  });
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextButton = document.querySelector(".carousel-button.right");
  const prevButton = document.querySelector(".carousel-button.left");
  const slideWidth = slides[0].getBoundingClientRect().width;

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
  };
  slides.forEach(setSlidePosition);

  const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
  };

  prevButton.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current-slide") || slides[0];
    const prevSlide =
      currentSlide.previousElementSibling || slides[slides.length - 1];
    moveToSlide(track, currentSlide, prevSlide);
  });

  nextButton.addEventListener("click", (e) => {
    const currentSlide = track.querySelector(".current-slide") || slides[0];
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    moveToSlide(track, currentSlide, nextSlide);
  });

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

  // Agrega un event listener al botón de cerrar sesión para ocultarlo cuando se haga clic.
  cerrarSesionBtn.addEventListener('click', function() {
    // Realiza aquí cualquier lógica necesaria para cerrar la sesión.
    // Por ejemplo, cambia el estado de la sesión o realiza una acción de cierre de sesión.
    // Luego, llama a la función para ocultar el botón de cerrar sesión.
    toggleCerrarSesion(false);
  });

  // Observa el estado de autenticación y actualiza la visibilidad del botón de cerrar sesión.
  auth((user) => {
    toggleCerrarSesion(user !== null); // Si hay un usuario autenticado, muestra el botón de cerrar sesión.
  });
});
