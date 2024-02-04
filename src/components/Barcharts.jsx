import React, { useState } from "react";
import { Chart,CategoryScale,LinearScale, BarElement,Title,Tooltip, Legend, } from "chart.js";
import { Bar} from "react-chartjs-2";

Chart.register(CategoryScale,LinearScale, BarElement,Title,Tooltip, Legend)

export default function Barchart(prop){
   
    const [graph,setgraph]=useState({
             datasets:[{
               
                 data:prop.data,
                 backgroundColor: [
                   ' rgba(255, 128, 0, 0.795)',
                   ' rgba(30, 195, 44, 0.499)',
                   'rgba(255, 0, 0, 0.745)',
                   'blue',
                   'rgb(255, 128, 128)',
                 'rgb(17, 166, 166)',
               
                ],
             }]
    })
          
    const [options, setOptions] = useState({
        responsive: true,
        title: {
            display: true,
            text: 'Status',
        },
        legend: {
            display: false, 
        },
    });
          
    return(
        <div className='barchat'>
          {graph&&  <Bar   data={graph} options={options} />}
        </div>

    )
}