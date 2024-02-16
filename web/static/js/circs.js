/**
 * Ce fichier contient les fonctions nécessaires à l'initialisation
 * et à la configuration d'un graphique ECharts représentant l'évolution des élections législatives
 * au niveau des circonscriptions. Il utilise les données fournies (solutionData, decisionData)
 * pour générer un graphique dynamique.
 *
 * @param {Array} solutionData - Les données des solutions électorales.
 * @param {Array} decisionData - Les données des décisions électorales par circonscription.
 */

var ROOT_PATH = 'https://echarts.apache.org/examples';

function getRandomColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)]; // 仅使用89ABCDEF中的字符
  }
  return color;
}

/**
 * Initialise le graphique ECharts pour représenter l'évolution des élections législatives par circonscription.
 *
 * @param {Array} solutionData - Les données des solutions électorales.
 * @param {Array} decisionData - Les données des décisions électorales par circonscription.
 */
function initCircsEcharts(solutionData, decisionData) {
  // Enregistre la carte
  var chartDom = document.getElementById('circs');
  var myChart = echarts.init(chartDom);
  var myData = decisionData.map(item => {
    return {
      name: item.name,
      value: item.value,
      label: {
        formatter: [
          '{title|{b}}{abg|}',
          '  {solutionHead|Solution}{valueHead|nums}',
          '{hr|}',
          `  {s1|Inéligibilité}{value|${item.value1}}`,
          `  {s2|Rejet}{value|${item.value2}}`,
          `  {s3|Annulation}{value|${item.value3}}`,
          `  {s4|Non lieu à prononcer l'inéligibilité}{value|${item.value4}}`,
        ].join('\n'),
        backgroundColor: '#eee',
        borderColor: '#494949',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          title: {
            color: '#eee',
            align: 'center'
          },
          abg: {
            backgroundColor: '#333',
            width: '100%',
            align: 'right',
            height: 25,
            borderRadius: [4, 4, 0, 0]
          },
          "s1": {
            height: 30,
            align: 'left',
          }, "s2": {
            height: 30,
            align: 'left',
          }, "s3": {
            height: 30,
            align: 'left',
          }, "s4": {
            height: 30,
            align: 'left',
          },
          solutionHead: {
            color: '#333',
            height: 24,
            align: 'left'
          },
          hr: {
            borderColor: '#777',
            width: '100%',
            borderWidth: 0.5,
            height: 0
          },
          value: {
            width: 20,
            padding: [0, 20, 0, 30],
            align: 'right'
          },
          valueHead: {
            color: '#333',
            width: 20,
            padding: [0, 20, 0, 30],
            align: 'right'
          },
        }
      },
      itemStyle: {
        color: getRandomColor()
      }
    }
  })
  console.log(myData)

  var option = {
    // titre
    title: {
      text: 'Evolution des élections législatives',
      subtext: '-- Circonscriptions --',
      left: 'center'
    },

    tooltip: {
      trigger: 'item'
    },

    legend: {
      bottom: 10,
      left: 'center',
      data: solutionData,
    },

    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        selectedMode: 'single',

        // Infobulle
        tooltip: {
          triggerOn: 'item',
          backgroundColor: 'rgba(8, 8, 8, .85)',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
        },

        // Style des étiquettes
        label: {

          // Style des étiquettes par défaut
          normal: {
            show: false
          },

          // Style des étiquettes en surbrillance
          emphasis: {
            show: true,
            color: '#010c04',
            fontSize: 16
          }
        },

        // Style en mode sélection
        select: {
          // Style des étiquettes en mode sélection
          label: {
            show: false
          },

          // Style des blocs de la carte en mode sélection
          itemStyle: {
            areaColor: '#2b8bf3'
          }
        },

        // Style des blocs de la carte
        itemStyle: {
          // Style des blocs de la carte par défaut
          normal: {
            areaColor: '#083288',
            borderColor: 'rgba(0, 210, 255, 1)', // #00d2ff
            borderWidth: 2,
            color: '#fff'
          },

          // Style des blocs de la carte en surbrillance
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        },

        data: myData,
      }
    ]
  };

  myChart.setOption(option);
}

