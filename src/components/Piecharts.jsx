import { Chart } from "chart.js";
import React, { useState } from "react";
import { ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Legend);



export default function Piechart(props) {

 
const data = {
  labels: [ 'Solved','Pending','Waiting','ON Hold','Unassigned'],
  datasets: [
    {
      data:[(props.data).Solved,
        (props.data).Pending,
        (props.data).Waiting,
        (props.data).OnHold,
        (props.data).Unassigned],

      backgroundColor: [
        'green',
        'red',
        'blue',
        'rgb(255, 128, 128)',
        'rgb(17, 166, 166)'
      ],
      borderColor: [
        'black',
        'black',
        'black',
        'black',
        'black',
        'black'
       
      ],
      borderWidth: 3,
    },
  ],
};


  return(
    <div style={{width:'100%',height:'45vh'}}>
<Pie data={data}  />
    </div>
  ) 
}
