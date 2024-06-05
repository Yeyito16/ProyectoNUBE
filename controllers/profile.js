import { authState, signOutSession } from "./app.js";
import {
  deleteDocument,
  deleteDocumentFromOwner,
  getBikeById,
  getOwnerBikes,
} from "./db/database.js";

document.addEventListener("DOMContentLoaded", async () => {
  const ownerBikes = document.getElementById("owner-bikes");
  const signOutBtn = document.getElementById("signout");

  await authState(async (user) => {
    if (user) {
      await getOwnerBikes(user.uid).then((result) => {
        let data = result.data();
        let bikes = data.bikes;
        console.log(data.bikes);
        bikes.forEach(async (bike) => {
          await getBikeById(bike).then((bikeResult) => {
            let bikeData = bikeResult.data();
            if (bikeData) {
              ownerBikes.innerHTML += `
                <a class="catalogo-item">
                    <img src="${bikeData.picture}" alt="bicicleta">
                    <h3>${bikeData.bikeName}</h3>
                    <h4>Descripcion: ${bikeData.description}</h4>
                    <h5>precio hora: ${bikeData.pricePerHour}</h5>
                    <h5>precio dia: ${bikeData.pricePerDay}</h5>
                    <h5>precio semana: ${bikeData.pricePerWeek}</h5>
                    <button type="button" class="delete-btn button bg-red txt-white w-20" data-id="${bikeResult.id}"">Eliminar</button>
                </a>
              `;
            } else {
                ownerBikes.innerHTML += `<h3>No hay bicicletas</h3>`
            }
          });
        });
      });
    } else {
      window.location.href = "../";
    }

    signOutBtn.addEventListener("click", async () => {
      await signOutSession();
    });

    ownerBikes.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete-btn")) {
        const id = e.target.dataset.id;
        deleteDocument(id).then(() => {
          alert("Se elimino de bikes");
        });
        deleteDocumentFromOwner(user.uid, id).then(() => {
          alert("Se elimino de owner");
        });
      }
    });
  });
});
