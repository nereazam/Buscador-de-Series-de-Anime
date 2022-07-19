"use strict";
////////funcion para icono cerrar favoritos
function closeIcon(ev) {
  const favSelected = parseInt(ev.currentTarget.id);

  const favoriteFound = favoritesList.findIndex(
    (fav) => fav.mal_id === favSelected
  );

  favoritesList.splice(favoriteFound, 1);
  renderFavourites();
  console.log(favoritesList);

  localStorage.setItem("data", JSON.stringify(favoritesList));
}

//escuchadora de icon
function listenIcon() {
  const liIcon = document.querySelectorAll(".js-icon");
  for (const li of liIcon) {
    li.addEventListener("click", closeIcon);
  }
}
