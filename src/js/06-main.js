"use strict";

// SECCIÓN 1. ELEMENTOS DEL HTML
const input = document.querySelector(".js-input");
const reset = document.querySelector(".js-reset");
const search = document.querySelector(".js-search");
const cards = document.querySelector(".js-cards");
const img = document.querySelector(".js-img");
const left = document.querySelector(".js-section-fav");
const cardTitle = document.querySelector(".js-title");

let result = [];
let favorites = [];

//funcion del API
function callServer(event) {
  event.preventDefault();

  let userElection = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${userElection}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
      result = json.data;
    });
  renderFilms();
}

function renderFilms() {
  let html = "";
  let classFavorite = "";
  for (const anime of result) {
    const favoriteFoundIndex = favorites.findIndex(
      (fav) => anime.id === fav.id
    );
    if (favoriteFoundIndex !== -1) {
      classFavorite = "anime--favorite";
      left.innerHTML += favorites;
    } else {
      classFavorite = "";
    }

    html += `<article class= "card ${classFavorite} js-list-anime" id="${anime.mal_id}">`;
    if (
      anime.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img src="https://via.placeholder.com/210x320/f88ffff/866666/?text=IMG" alt="img" class="js-placeholder)/>`;
    } else {
      html += `<img src="${anime.images.jpg.image_url}"
    alt="img"
    class=" js-img" />`;
    }
    html += `<p class= "titles js-title">${anime.title}</p>`;
    html += `</article>`;

    cards.innerHTML = html;
  }
  listenerSeries();
}

function handelClick(ev) {
  const idSelected = parseInt(ev.currentTarget.id);

  const animeFound = result.find((series) => series.mal_id === idSelected);

  const favoriteFound = favorites.findIndex((fav) => fav.mal_id === idSelected);

  if (favoriteFound === -1) {
    favorites.push(animeFound);
  } else {
    favorites.splice(favoriteFound, 1);
  }
  renderFilms();
}

const listenerSeries = (ev) => {
  const liFavorites = document.querySelectorAll(".js-list-anime");
  for (const li of liFavorites) {
    li.addEventListener("click", handelClick);
  }
};

//funcion del reset
search.addEventListener("click", callServer);

const handelReset = (event) => {
  event.preventDefault();
  input.value = "";
};

reset.addEventListener("click", handelReset);

function onLocal() {
  const dataLocalStorage = JSON.parse(localStorage.getItem("data"));
  if (dataLocalStorage === null) {
  } else {
    callServer();
  }
}
onLocal();
