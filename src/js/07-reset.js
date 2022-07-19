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
  favoritesList = "";
  // console.log("hello")

  renderFavourites();
  erase.classList.add("hiden");
  localStorage.removeItem(" dataLocalStorage");
}

erase.addEventListener("click", handelErase);
