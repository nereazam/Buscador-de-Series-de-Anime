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
html += `<article class= "card" "js-list-anime" id="${anime.mal_id}">`;
    //if (anime.url="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"){
    //  html=""
   //   html += `<img src="https://via.placeholder.com/210x320/f88ffff/866666/?text=IMG"`}
//else{
    html += `<img src="${anime.images.jpg.image_url}";
    alt="img"
    class=" js-img" />`;

    html += `<p class= "title ">${anime.title}</p>`
    html += `</article>`};
cards.innerHTML = html ;
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
};
search.addEventListener("click", callServer);


/*


*/
 







