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
      window.location.pathname = "/map/";
      break;
    case "v-pills-maps-tab":
      window.location.pathname = "/maps/";
      break;
    case "v-pills-statistics-tab":
      window.location.pathname = "/statistics/";
      break;
  }
}