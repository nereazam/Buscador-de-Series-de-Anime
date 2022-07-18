"use strict";const input=document.querySelector(".js-input"),reset=document.querySelector(".js-reset"),search=document.querySelector(".js-search"),cards=document.querySelector(".js-cards"),img=document.querySelector(".js-img"),left=document.querySelector(".js-fav"),cardTitle=document.querySelector(".js-title"),icon=document.querySelector(".js-icon");let result=[],favoritesList=[];function renderFavourites(){let e="";for(const t of favoritesList)e+=`<article class= "card js-list-anime" id="${t.mal_id}">`,e+='<i class="icon js-icon fa-solid fa-circle-xmark"></i>',"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"===t.images.jpg.image_url?e+='<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" class="js-placeholder)/>':e+=`<img src="${t.images.jpg.image_url}";\n  alt="img"\n  class=" img js-img" />`,e+=`<p class= "titles js-title">${t.title}</p>`,e+="</article>";left.innerHTML=e}function renderFilms(){let e="",t="";for(const i of result){t=-1!==favoritesList.findIndex(e=>i.mal_id===e.mal_id)?"anime-favorite":"",e+=`<article class= "card ${t} js-list-anime" id="${i.mal_id}">`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"===i.images.jpg.image_url?e+=`<img src="https://via.placeholder.com/120x100/f88ffff/866666/?text=IMG" alt="img" class=" ${t} js-placeholder)/>`:e+=`<img src="${i.images.jpg.image_url}";\n      alt="img"\n      class=" img js-img" />`,e+=`<p class= "titles ${t} js-title">${i.title}</p>`,e+="</article>",cards.innerHTML=e}listenerSeries()}function callServer(){let e=input.value;fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{result=e.data,renderFilms(result)})}function handelClickServer(e){e.preventDefault(),callServer(),listenerSeries()}function handelClick(e){const t=parseInt(e.currentTarget.id),i=result.find(e=>e.mal_id===t),s=favoritesList.findIndex(e=>e.mal_id===t);-1===s?favoritesList.push(i):favoritesList.splice(s,1),renderFilms(result),listenerSeries(),renderFavourites(),localStorage.setItem("data",JSON.stringify(favoritesList))}search.addEventListener("click",handelClickServer);const listenerSeries=()=>{const e=document.querySelectorAll(".js-list-anime");for(const t of e)t.addEventListener("click",handelClick)};function closeIcon(e){const t=parseInt(e.currentTarget.id),i=favoritesList.find(e=>e.mal_id===t);t&&favoritesList.splice(i,1)}function listenIcon(){const e=document.querySelectorAll(".js-icon");for(const t of e)t.addEventListener("click",closeIcon)}function onLocal(){const e=JSON.parse(localStorage.getItem("data"));null!==e?(favoritesList=e,renderFilms(favoritesList)):callServer()}onLocal(),console.log(favoritesList);const handelReset=e=>{e.preventDefault(),input.value="",cards.innerHTML=""};reset.addEventListener("click",handelReset);