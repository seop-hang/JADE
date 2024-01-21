var dataJson = "/static/geojson/departments.json";

var Dom1 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#fff94f;border-radius:50%;display:inline-block;"></span>'
var Dom2 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#2b8bf3;border-radius:50%;display:inline-block;"></span>'
var Dom3 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#3dd477;border-radius:50%;display:inline-block;"></span>'
var Dom4 = '<span style="width:10px;height:10px;margin-right:5px;background-color:#f00;border-radius:50%;display:inline-block;"></span>'

function initEcharts(mapData) {
  $.get(dataJson, (json) => {
    // 注册地图
    var myChart = echarts.init(document.querySelector('#map'));
    echarts.registerMap('france', json);

    var option = {
      // 标题
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


      // 地理坐标系组件
      geo: {
        map: 'france',
        zoom: 1.2,

        label: {
          show: false
        },

        itemStyle: {
          areaColor: 'rgb(21,100,164)',

          // 设置外层边框
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
          // 图表类型为地图
          type: 'map',

          // 使用 registerMap 注册的地图名称
          mapType: 'france',

          // 地图缩放比例
          zoom: 1.2,

          // 提示框
          tooltip: {
            triggerOn: 'item',
            backgroundColor: 'rgba(8, 8, 8, .85)',
            textStyle: {
              color: '#fff',
              fontSize: 16
            },
            // 处理悬浮提示
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

          // 标签的样式
          label: {

            // 标签在默认状态下的样式
            normal: {
              show: false
            },

            // 标签在高亮状态下的样式
            emphasis: {
              show: true,
              color: '#04f13b',
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
              areaColor: '#2b8bf3',
            }
          },

          data: mapData,
        }
      ]
    };

    myChart.setOption(option);
  });
}
