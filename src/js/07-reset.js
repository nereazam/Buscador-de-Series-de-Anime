"use strict";

//funcion del reset
const handelReset = (event) => {
  event.preventDefault();
  input.value = "";
  cards.innerHTML = "";
};

reset.addEventListener("click", handelReset);

///funcion del boton erase de favoritos
function handelErase(ev) {
  ev.preventDefault();
  favoritesList.slice(0);
  favoritesList = "";
  // console.log("hello")
  renderFavourites();
}

erase.addEventListener("click", handelErase);
