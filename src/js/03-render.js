"use strict";

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
