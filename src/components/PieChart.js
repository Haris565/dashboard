import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';


function PieChart() {
    var data = [
        
        {
          type: 'Accepted',
          value: 10,
        },
        {
          type: 'Rejected',
          value: 5,
        },
      ];
      var config = {
        appendPadding: 10,
        data: data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
          type: 'inner',
          offset: '-20%',
          content: function content(_ref) {
            var percent = _ref.percent;
            return ''.concat((percent * 100).toFixed(0), '%');
          },
          style: {
            fontSize: 14,
            color:"#fff",
            textAlign: 'center',
            
          },
        },
        interactions: [{ type: 'element-active' }],
      };

    return (
        <Pie {...config} />
    )
}

export default PieChart
