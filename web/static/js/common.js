/**
 * Ce fichier contient une fonction permettant de basculer entre les pages du projet JADE.
 * La fonction prend en paramètre le bouton cliqué et redirige l'utilisateur vers la page correspondante en utilisant
 * la propriété `window.location.pathname`.
 *
 * @param {HTMLElement} button - Le bouton cliqué pour basculer entre les pages.
 */

function switchPage(button) {
  let obj_button = $(button);
  let id = obj_button.attr("id");
  var newParams = '';
  var cleanURL = window.location.protocol + "//" + window.location.host + window.location.pathname + newParams;
  window.history.replaceState({}, document.title, cleanURL);
  switch (id) {
    case "v-pills-home-tab":
      window.location.href = "/home/";
      break;
    case "v-pills-table-tab":
      window.location.href = "/table/";
      break;
    case "v-pills-map-tab":
      window.location.href = "/departments/";
      break;
    case "v-pills-maps-tab":
      window.location.href = "/circonscriptions/";
      break;
    case "v-pills-statistics-tab":
      window.location.href = "/statistics/";
      break;
    case "v-pills-mentions-tab":
      window.location.href = "/mentions/"; 
      break;
  }
}