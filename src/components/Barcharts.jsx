import React, { useState } from "react";
import { Chart,CategoryScale,LinearScale, BarElement,Title,Tooltip, Legend, } from "chart.js";
import { Bar} from "react-chartjs-2";

Chart.register(CategoryScale,LinearScale, BarElement,Title,Tooltip, Legend)

export default function Barchart(prop){
   
    const [graph,setgraph]=useState({
             datasets:[{
                label:'',
                 data:prop.data,
                 backgroundColor: ["orange","red", "green","blue"],
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