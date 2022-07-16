"use strict";

// SECCIÓN 1. ELEMENTOS DEL HTML
const input = document.querySelector(".js-input");
const reset = document.querySelector(".js-reset");
const search = document.querySelector(".js-search");
const cards= document.querySelector(".js-cards");
const img= document.querySelector(".js-img");

let result = [];

function renderFilms() {
  let html = "";
  for (const anime of result) {
    html += `<article class= "list js-list-anime" id="${anime.mal_id}">`;
    html += `<img src="${anime.images.jpg.small_image_url}
    alt="img"
    class=" js-img" />`;
    html += `<p class= "js title">${anime.title}</p>`
    html += `</article>`};
cards.innerHTML = html ;
callServer();
}

function callServer  (event) {
  event.preventDefault();
  console.log("Hola");
  let userElection = input.value;
  fetch(`https://api.jikan.moe/v4/anime?q=${userElection}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json.data);
      result =  json.data;
    });
    renderFilms();
    callServer();
};
search.addEventListener("click", callServer);






//if src= "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"
//innerHTML="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"
 







