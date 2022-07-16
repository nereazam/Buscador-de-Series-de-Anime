"use strict";

// SECCIÓN 1. ELEMENTOS DEL HTML
const input = document.querySelector(".js-input");
const reset = document.querySelector(".js-reset");
const search = document.querySelector(".js-search");
const cards = document.querySelector(".js-cards");
const img = document.querySelector(".js-img");



let result = [];
let favorites = [];

function handelClick(ev) {
  console.log(ev.currentTarget.id);
  const idSelected = parseInt(ev.currentTarget.id);

  const animeFound = result.find((series) => series.id === idSelected);

  const favoriteFound = favorites.findIndex((fav) => fav.id === idSelected);

  if (favoriteFound === -1) {
    favorites.push(animeFound);
  } else {
    favorites.splice(favoriteFound, 1);
  }
  renderFilms()
  ;
}

const listenerSeries = (ev) => {
  ev.preventDefault();
  const liFavorites = document.querySelectorAll(".js-list-anime");
  for (const li of liFavorites) {
    li.addEventListener("click", handelClick);
  }
};

function renderFilms() {
  let html = "";
  let classFavorite = "";
  for (const anime of result) {
    const favoriteFoundIndex = favorites.findIndex(
      (fav) => anime.id === fav.id
    );
    if (favoriteFoundIndex !== -1) {
      classFavorite = "anime--favorite";
    } else {
      classFavorite = "";
    }

    html += `<article class= "card ${classFavorite} js-list-anime" id="${anime.mal_id}">`;
    //if (anime.url="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){
    //  html=""
    //   html += `<img src="https://via.placeholder.com/210x320/f88ffff/866666/?text=IMG"`}
    //else{
    html += `<img src="${anime.images.jpg.image_url}";
    alt="img"
    class=" js-img" />`;

    html += `<p class= "title ">${anime.title}</p>`;
    html += `</article>`;
  }
  cards.innerHTML = html;
  listenerSeries();
}
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

//funcion del reset
search.addEventListener("click", callServer);

const handelReset = (event) => {
  event.preventDefault();
  input.value = "";
};

reset.addEventListener("click", handelReset);
