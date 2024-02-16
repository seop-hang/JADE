/**
 * Ce fichier contient la configuration des graphiques utilisés pour afficher des statistiques.
 * Deux graphiques (graphic1 et graphic2) sont initialisés avec des options prédéfinies.
 */

var chartDom1 = document.getElementById('graphic1');
var chartDom2 = document.getElementById('graphic2');

var myChart1 = echarts.init(chartDom1);
var myChart2 = echarts.init(chartDom2);

/**
 * Fonction pour générer une couleur aléatoire claire.
 * Utilise les caractères '89ABCDEF' pour générer une couleur en format hexadécimal.
 * @returns {string} - Couleur générée de format hexadécimal.
 */
function getRandomLightColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)]; // 仅使用89ABCDEF中的字符
  }
  return color;
}

/**
 * Fonction pour initialiser les graphiques avec les options préexistantes (option1 et option2).
 */
function initCharts(){
  option1 && myChart1.setOption(option1);
  option2 && myChart2.setOption(option2);
}








