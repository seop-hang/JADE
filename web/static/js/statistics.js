var chartDom1 = document.getElementById('graphic1');
var chartDom2 = document.getElementById('graphic2');

var myChart1 = echarts.init(chartDom1);
var myChart2 = echarts.init(chartDom2);

function getRandomLightColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)]; // 仅使用89ABCDEF中的字符
  }
  return color;
}

function initCharts(){
  option1 && myChart1.setOption(option1);
  option2 && myChart2.setOption(option2);
}








