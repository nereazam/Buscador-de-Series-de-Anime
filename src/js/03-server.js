"use strict";

//funcion del API
function callServer() {
  let userElection = input.value;

  fetch(`https://api.jikan.moe/v4/anime?q=${userElection}`)
    .then((response) => response.json())
    .then((json) => {
      result = json.data.map((each) => {
        return {
          mal_id: each.mal_id,
          title: each.title,
          images: each.images,
          type: each.type,
        };
      });

      renderFilms(result);
    });
}
  //.catch ((error) => console.log(`Ha sucedido un error: ${error}`))

function handelClickServer(ev) {
  ev.preventDefault();
  callServer();
  listenerSeries();

  notFound();
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
