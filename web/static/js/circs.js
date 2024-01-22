var ROOT_PATH = 'https://echarts.apache.org/examples';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function initCircsEcharts(solutionData, decisionData) {
  // 注册地图
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
    // 标题
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

        // 提示框
        tooltip: {
          triggerOn: 'item',
          backgroundColor: 'rgba(8, 8, 8, .85)',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
        },

        // 标签的样式
        label: {

          // 标签在默认状态下的样式
          normal: {
            show: false
          },

          // 标签在高亮状态下的样式
          emphasis: {
            show: true,
            color: '#010c04',
            fontSize: 16
          }
        },

        // 选中状态下的样式
        select: {
          // 标签在选中状态下的样式
          label: {
            show: false
          },

          // 选中状态下地图上区域块的样式
          itemStyle: {
            areaColor: '#2b8bf3'
          }
        },

        // 地图上区域块的样式
        itemStyle: {
          // 默认状态下地图的颜色
          normal: {
            areaColor: '#083288',
            borderColor: 'rgba(0, 210, 255, 1)', // #00d2ff
            borderWidth: 2,
            color: '#fff'
          },

          // 选中状态下地图的颜色
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

