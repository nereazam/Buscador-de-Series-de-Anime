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

renderFavourites();
