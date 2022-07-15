"use strict";

//method: "POST",
//headers: {"content-Type": "application/json" },
// body: JSON.stringify(data),

// SECCIÓN 1. ELEMENTOS DEL HTML
const input = document.querySelector(".js-input");
const reset = document.querySelector(".js-reset");
const search = document.querySelector(".js-search");
const listUl = document.querySelector(".js-list");

// SECCIÓN 2. VARIABLES GLOBALES
let result = [];

// SECCIÓN 3. FUNCIONES
function renderFilms() {
  let html = "";

  for (const film of result) {
    html += `<li>${film.tittle}</li>`;
    html += `<li>${film.images}</li>`;

    for (const image of film.images) {
      console.log(film.images);
    }
  }

  listUl.innerHTML = html;
}
// SECCIÓN 4. FUNCIONES DE EVENTOS

// SECCIÓN 5. EVENTOS

search.addEventListener("click", (event) => {
  event.preventDefault();

  const userElection = input.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${userElection}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      result = json.data;
      renderFilms();
    });
});
