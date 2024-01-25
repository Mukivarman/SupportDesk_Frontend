import { Chart } from "chart.js";
import React, { useState } from "react";
import { ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);



export default function Piechart(props) {

 
const data = {
  labels: ['Pending', 'Solved', 'Unassigned'],
  datasets: [
    {
      data:[(props.data).Pending,(props.data).Solved,(props.data).Unassigned],
      backgroundColor: [
        
        'rgba(255, 0, 0, 0.745)',
        ' rgba(30, 195, 44, 0.499)',
        'rgba(60, 30, 195, 0.499)',
        
        
      ],
      borderColor: [
        'black',
        'black',
        'black',
       
      ],
      borderWidth: 3,
    },
  ],
};
  return(
    <div style={{width:'100%',height:'45vh'}}>
<Pie data={data} />
    </div>
  ) 
}
