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
  switch (id) {
    case "v-pills-home-tab":
      window.location.pathname = "/home/";
      break;
    case "v-pills-table-tab":
      window.location.pathname = "/table/";
      break;
    case "v-pills-map-tab":
      window.location.pathname = "/departments/";
      break;
    case "v-pills-maps-tab":
      window.location.pathname = "/circonscriptions/";
      break;
    case "v-pills-statistics-tab":
      window.location.pathname = "/statistics/";
      break;
  }
}