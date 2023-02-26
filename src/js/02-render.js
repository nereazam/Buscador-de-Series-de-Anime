"use strict";

function renderFavourites() {
  let html = "";

  for (const anime of favoritesList) {
    html += `<article class= "card2 js-list-anime" id="${anime.mal_id}">`;

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

    html += `<p class= "titles2 js-title">${anime.title}</p>`;

    html += `<i class="icon js-icon fa-solid fa-circle-xmark"></i>`;
    html += `</article>`;
  }

  left.innerHTML = html;
  listenIcon();
}

function renderFilms() {
  let html = "";
  let classFavorite = "";

  //con esto añdo la clase para resaltar el favorito

  for (const anime of result) {
    const favoriteFoundIndex = favoritesList.findIndex(
      (fav) => anime.mal_id === fav.mal_id
    );

    //if (favoriteFoundIndex !== -1) {
    //  classFavorite = "anime-favorite";
    //} else {
    // classFavorite = "";
    // }

    favoriteFoundIndex !== -1
      ? (classFavorite = "anime-favorite")
      : (classFavorite = "");

    // con esto pinto cada card

    html += `<article class= "card ${classFavorite} js-list-anime" id="${anime.mal_id}">`;
    if (
      anime.images.jpg.image_url ===
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
    ) {
      html += `<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" js-placeholder)/>`;
      html += `<p class= "titles ${classFavorite} js-title">${anime.title}</p>`;
      html += `</article>`;
    } else {
      html += `<img src="${anime.images.jpg.image_url}";
      alt="img"
      class=" img js-img" />`;
      html += `<p class= "titles ${classFavorite} js-title">${anime.title}</p>`;
      html += `</article>`;
    }

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

const removeMsg = () => (ad.innerHTML = "");

function notFound() {
  const datas = result.filter((item) =>
    item.title.toLowerCase().includes(search.value.toLowerCase())
  );

  if (datas.length === 0) {
    ad.innerHTML = "¡Introduce un título!";
    setTimeout(removeMsg, 3000);
  } else {
    ad.innerHTML = "¡Título no encontrado!";
  }
}
