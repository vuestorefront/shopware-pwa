import Vue from "vue";

let decoder;
Vue.prototype.$entitiesDecoder = (text) => {
  decoder = decoder || document.createElement("div");
  decoder.innerHTML = text;
  return decoder.textContent;
};
