"use strict";

// SECCIÓN 1. ELEMENTOS DEL HTML
const input = document.querySelector(".js-input");
const reset = document.querySelector(".js-reset");
const search = document.querySelector(".js-search");
const cards = document.querySelector(".js-cards");
const img = document.querySelector(".js-img");
const left = document.querySelector(".js-fav");
const cardTitle = document.querySelector(".js-title");
const icon = document.querySelector(".js-icon");
let result = [];
let favoritesList = [];

//funcion del API
function callServer() {
  let userElection = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${userElection}`)
    .then((response) => response.json())
    .then((json) => {
      result = json.data;

      renderFilms(result);
    });
}
function handelClickServer(ev) {
  ev.preventDefault();
  callServer();
  listenerSeries();
}

search.addEventListener("click", handelClickServer);

function renderFavourites() {
  let html = "";

  for (const anime of favoritesList) {
    html += `<article class= "card js-list-anime" id="${anime.mal_id}">`;
    html += `<i class="icon js-icon fa-solid fa-circle-xmark"></i>`;
    if (
      anime.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" class="js-placeholder)/>`;
    } else {
      html += `<img src="${anime.images.jpg.image_url}";
alt="img"
class=" img js-img" />`;
    }

    html += `<p class= "titles js-title">${anime.title}</p>`;
    html += `</article>`;
  }

  left.innerHTML = html;
}

function renderFilms() {
  let html = "";
  let classFavorite = "";

  //con esto añdo la clase para resaltar el favorito

  for (const anime of result) {
    const favoriteFoundIndex = favoritesList.findIndex(
      (fav) => anime.mal_id === fav.mal_id
    );

    if (favoriteFoundIndex !== -1) {
      classFavorite = "anime-favorite";
    } else {
      classFavorite = "";
    }
    // con esto pinto cada card
    html += `<article class= "card ${classFavorite} js-list-anime" id="${anime.mal_id}">`;
    if (
      anime.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" class=" ${classFavorite} js-placeholder)/>`;
    } else {
      html += `<img src="${anime.images.jpg.image_url}";
    alt="img"
    class=" img js-img" />`;
    }
    html += `<p class= "titles ${classFavorite} js-title">${anime.title}</p>`;
    html += `</article>`;

    cards.innerHTML = html;
  }

  listenerSeries();
}
//funcion que encuentra el click sobr el favorito y lo añade o lo quita del array favorites
function handelClick(ev) {
  const idSelected = parseInt(ev.currentTarget.id);

  const animeFound = result.find((select) => select.mal_id === idSelected);
  const favoriteFound = favoritesList.findIndex(
    (fav) => fav.mal_id === idSelected
  );
  if (favoriteFound === -1) {
    favoritesList.push(animeFound);
  } else {
    favoritesList.splice(favoriteFound, 1);
  }

  renderFilms(result);
  listenerSeries();
  renderFavourites();

  localStorage.setItem("data", JSON.stringify(favoritesList));
}
//escuchador sobre cada card del array html
const listenerSeries = () => {
  const liFavorites = document.querySelectorAll(".js-list-anime");
  for (const li of liFavorites) {
    li.addEventListener("click", handelClick);
  }
};

//funcion del reset
const handelReset = (event) => {
  event.preventDefault();
  input.value = "";
  cards.innerHTML = "";
};

reset.addEventListener("click", handelReset);
// funcion Local Storage
function onLocal() {
  const dataLocalStorage = JSON.parse(localStorage.getItem("data"));
  if (dataLocalStorage !== null) {
    favoritesList = dataLocalStorage;
    renderFilms(favoritesList);
  } else {
    callServer();
  }
}
onLocal();
console.log(favoritesList);
////////funcion para icono cerrar favoritos
function closeIcon(ev) {
  const favSelected = parseInt(ev.currentTarget.id);

  const erasableFav = favoritesList.find(
    (select) => select.mal_id === favSelected
  );

  if (favSelected) {
    favoritesList.splice(erasableFav, 1);
  } else {
  }
}
function listenIcon() {
  const liIcon = document.querySelectorAll(".js-icon");
  for (const li of liIcon) {
    li.addEventListener("click", closeIcon);
  }
}
