/**
 * Ce fichier contient une fonction pour initialiser la visualisation cartographique des décisions.
 * La fonction utilise ECharts pour créer une carte interactive avec des informations détaillées sur chaque département.
 *
 * @param {Array} mapData - Les données à afficher sur la carte, comprenant les décisions pour chaque département.
 */

var dataJson = "/static/geojson/departments.json";

var Dom1 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#fff94f;border-radius:50%;display:inline-block;"></span>'
var Dom2 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#2b8bf3;border-radius:50%;display:inline-block;"></span>'
var Dom3 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#3dd477;border-radius:50%;display:inline-block;"></span>'
var Dom4 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#f00;border-radius:50%;display:inline-block;"></span>'

function initEcharts(mapData) {
  $.get(dataJson, (json) => {
    // Enregistrement de la carte
    var myChart = echarts.init(document.querySelector('#map'));
    echarts.registerMap('france', json);

    var option = {
      // Titre
      title: [
        {
          "textStyle": {
            "color": "#000",
            "fontSize": 18
          },
          "subtext": "-- Départements --",
          "text": "Visualisation cartographique des décisions",
          "top": "auto",
          "subtextStyle": {
            "color": "#aaa",
            "fontSize": 12,
          },
          "left": "center",
        }
      ],

      tooltip: {
        trigger: 'item'
      },


      // Composant de coordonnées géographiques
      geo: {
        map: 'france',
        zoom: 1.2,

        label: {
          show: false
        },

        itemStyle: {
          areaColor: 'rgb(21,100,164)',

          // Paramètres de la bordure externe
          borderWidth: 1,
          borderColor: 'rgba(34,216,255, 1)',
          shadowColor: 'rgba(34,216,255, 1)', // #044B4D
          shadowOffsetY: 3,
          shadowOffsetX: 3,
          shadowBlur: 2
        }
      },

      series: [
        {
          // Type de graphique : carte
          type: 'map',

          // Utilisation de la carte enregistrée
          mapType: 'france',

          // Zoom de la carte
          zoom: 1.2,

          // Tooltip
          tooltip: {
            triggerOn: 'item',
            backgroundColor: 'rgba(8, 8, 8, .85)',
            textStyle: {
              color: '#fff',
              fontSize: 16
            },
            // Gestion du tooltip
            formatter: (params) => {
              return (
                params.data.name + '<br/>' +
                Dom1 + 'Inéligibilité : ' + params.data['Inéligibilité'] + '<br/>' +
                Dom2 + 'Rejet : ' + params.data['Rejet'] + '<br/>' +
                Dom3 + 'Annulation : ' + params.data['Annulation'] + '<br/>' +
                Dom4 + "Non lieu à prononcer l'inéligibilité : " + params.data["Non lieu à prononcer l'inéligibilité"] + '<br/>'
              )
            }
          },

          // Style des étiquettes
          label: {

            // Style des étiquettes en état par défaut
            normal: {
              show: false
            },

            // Style des étiquettes en surbrillance
            emphasis: {
              show: true,
              color: '#04f13b',
              fontSize: 16
            }
          },

          // Style en état sélectionné
          select: {
            // Style des étiquettes en état sélectionné
            label: {
              show: false
            },

            // Style des blocs de la carte en état sélectionné
            itemStyle: {
              areaColor: '#2b8bf3'
            }
          },

          // Style des blocs de la carte
          itemStyle: {
            // Style en état par défaut
            normal: {
              areaColor: '#083288',
              borderColor: 'rgba(0, 210, 255, 1)', // #00d2ff
              borderWidth: 2,
              color: '#fff'
            },

            // Style en état de surbrillance
            emphasis: {
              areaColor: '#2b8bf3',
            }
          },

          selectedMode: 'single',

          data: mapData,

          events: {
            'click': function (params) {
              window.location.href = "www.baidu.com"
              console.log("okkk")
              console.log(params);
            }
          }
        }
      ]
    };

    myChart.setOption(option);
    myChart.on('click', function (params) {
      if (params.componentType === 'series' && params.seriesType === 'map') {
        var searchParams = new URLSearchParams(window.location.search);
        var thisSolution=searchParams.get('solution')!== null ? searchParams.get('solution') : '';
        var thisArticle=searchParams.get('article38')!== null ? searchParams.get('article38') : '';
        var thisDebut=searchParams.get('annee_debut')!== null ? searchParams.get('annee_debut') : '';
        var thisEnd=searchParams.get('annee_end')!== null ? searchParams.get('annee_end') : '';
        var thisDep=params.name;
        window.location.href='/table/?solution='+thisSolution+'&article38='+thisArticle+'&annee_debut='+thisDebut
          +'&annee_end='+thisEnd+'&nom_dep='+thisDep
      }
    })
  });
}
