import { authState } from "./app.js";
import { addBikeData, getAllBikes } from "./db/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  const catalogoContainer = document.getElementById("catalogo-container");
  const carouselTrack = document.getElementById("carousel-track");
  const profileSection = document.getElementById("profile-section");

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

  await authState((user) => {
    if (user) {
      profileSection.innerHTML = `
        <a href="./templates/profile.html" class="register-link">Ir a perfil</a>
      `;
    } else {
      profileSection.innerHTML = `
        <a href="./templates/register.html" class="register-link">Registro | Iniciar Sesión</a>
      `;
    }
  });
});
