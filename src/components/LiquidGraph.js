import { Gauge, Liquid } from '@ant-design/charts' ; 


function LiquidGraph({firstColor, secondColor, percentage,status }) {
  var config = {
    percent: 0.25,
    range: { color: `l(0) 0:${secondColor} 1:${firstColor}` },
    startAngle: Math.PI,
    endAngle: 3 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '22px',
          color: '#fff',
        },
        formatter: function formatter() {
          return `${percentage}%`;
        },
      },
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '40px',
          color: '#fff',
        },
        formatter: function formatter() {
          return status;
        },
      },
    },
  };
  return <Gauge {...config} />;
};

export default LiquidGraph
