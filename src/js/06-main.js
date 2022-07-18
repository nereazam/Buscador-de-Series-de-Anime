"use strict";
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

////////funcion para icono cerrar favoritos
function closeIcon(ev) {
  const favSelected = parseInt(ev.currentTarget.id);

  const erasableFav = favoritesList.find(
    (select) => select.mal_id === favSelected
  );
  //const favoriteFound = favoritesList.findIndex(
  // (fav) => fav.mal_id === favSelected);

  if (favSelected) {
    favoritesList.splice(erasableFav, 1);
  } else {
  }
}

//escuchadora de icon
function listenIcon() {
  const liIcon = document.querySelectorAll(".js-icon");
  for (const li of liIcon) {
    li.addEventListener("click", closeIcon);
  }
}

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
