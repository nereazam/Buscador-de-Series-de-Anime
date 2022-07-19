"use strict";

//funcion del reset
const handelReset = (event) => {
  event.preventDefault();
  input.value = "";
  cards.innerHTML = "";
};

reset.addEventListener("click", handelReset);
