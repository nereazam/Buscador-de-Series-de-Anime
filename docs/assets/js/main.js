"use strict";
const input = document.querySelector(".js-input"),
  reset = document.querySelector(".js-reset"),
  search = document.querySelector(".js-search"),
  cards = document.querySelector(".js-cards"),
  img = document.querySelector(".js-img"),
  left = document.querySelector(".js-fav"),
  cardTitle = document.querySelector(".js-title"),
  icon = document.querySelector(".js-icon"),
  erase = document.querySelector(".js-erase");
let result = [],
  favoritesList = [];
function renderFavourites() {
  let e = "";
  for (const t of favoritesList)
    (e += `<div class= "card2 js-list-anime" id="${t.mal_id}">`),
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" ===
      t.images.jpg.image_url
        ? (e +=
            '<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" class="js-placeholder)/>')
        : (e += `<img src="${t.images.jpg.image_url}";\n  alt="img"\n  class=" img js-img" />`),
      (e += `<p class= "titles2 js-title">${t.title}</p>`),
      (e += '<i class="icon js-icon fa-solid fa-circle-xmark"></i>'),
      (e += "</div>");
  (left.innerHTML = e), listenIcon();
}
function renderFilms() {
  let e = "",
    t = "";
  for (const i of result) {
    (t =
      -1 !== favoritesList.findIndex((e) => i.mal_id === e.mal_id)
        ? "anime-favorite"
        : ""),
      (e += `<div class= "card ${t} js-list-anime" id="${i.mal_id}">`),
      "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" ===
      i.images.jpg.image_url
        ? ((e +=
            '<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" js-placeholder)/>'),
          (e += `<p class= "titles ${t} js-title">${i.title}</p>`),
          (e += "</div>"))
        : ((e += `<img src="${i.images.jpg.image_url}";\n      alt="img"\n      class=" img js-img" />`),
          (e += `<p class= "titles ${t} js-title">${i.title}</p>`),
          (e += "</div>")),
      (cards.innerHTML = e);
  }
  listenerSeries();
}
function handelClick(e) {
  const t = parseInt(e.currentTarget.id),
    i = result.find((e) => e.mal_id === t),
    s = favoritesList.findIndex((e) => e.mal_id === t);
  -1 === s ? favoritesList.push(i) : favoritesList.splice(s, 1),
    renderFilms(result),
    listenerSeries(),
    renderFavourites(),
    localStorage.setItem("data", JSON.stringify(favoritesList));
}
const listenerSeries = () => {
  const e = document.querySelectorAll(".js-list-anime");
  for (const t of e) t.addEventListener("click", handelClick);
};
function callServer() {
  let e = input.value;
  fetch("https://api.jikan.moe/v4/anime?q=" + e)
    .then((e) => e.json())
    .then((e) => {
      (result = e.data), renderFilms(result);
    });
}
function handelClickServer(e) {
  e.preventDefault(), callServer(), listenerSeries();
}
function onLocal() {
  const e = JSON.parse(localStorage.getItem("data"));
  null !== e ? ((favoritesList = e), renderFilms(favoritesList)) : callServer();
}
search.addEventListener("click", handelClickServer),
  onLocal(),
  renderFavourites();
const handelReset = (e) => {
  e.preventDefault(), (input.value = ""), (cards.innerHTML = "");
};
function handelErase(e) {
  e.preventDefault(),
    (favoritesList = ""),
    renderFavourites(),
    erase.classList.add("hiden"),
    localStorage.removeItem("data");
}
function closeIcon(e) {
  const t = parseInt(e.currentTarget.id),
    i = favoritesList.findIndex((e) => e.mal_id === t);
  favoritesList.splice(i, 1),
    renderFavourites(),
    console.log(favoritesList),
    localStorage.setItem("data", JSON.stringify(favoritesList));
}
function listenIcon() {
  const e = document.querySelectorAll(".js-icon");
  for (const t of e) t.addEventListener("click", closeIcon);
}
reset.addEventListener("click", handelReset),
  erase.addEventListener("click", handelErase);
