import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { Link, Navigate } from "react-router-dom";

import Piechart from "../components/Piecharts";
import { useState } from "react";
import Barchart from "../components/Barcharts";
import { useNavigate } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";


export default function Adminpage(){
  const userString = localStorage.getItem("loguser");
  const user = userString ? JSON.parse(userString) : null;
  console.log(user)
 

    const [Status,setStatus]=useState(null)
    const [chart,setchart]=useState(true)
     const navigate=useNavigate()
     const [Accesspage,setAccesspage]=useState(false)
     const [loading,setloading]=useState(false)

     useEffect(()=>{
    
         

      if(user){
        const thispage='Admin'
          checkalreadyclint(user,setAccesspage,navigate,thispage)
      }
      else{
          navigate('/Login')
      }

    
},[])

    useEffect(()=>{
        const fetching=async()=>{
          const Data=  await fetch('/api/status',{
            method:'Get',
            headers:{
                'Content-Type': 'application/json',  
                'authorization':`Bearer ${user.jwttoken}`
            }
          })
    if(Data.ok){
      
        const getdata=await Data.json()
        setStatus(getdata)
        setloading(true)
        
}
        }
if(user&&Accesspage){
        fetching()
}
    },[Accesspage]);

      const changechart=()=>{
        setchart((!chart))
      }

const linktoallticket=()=>{
    console.log('navigate')
    navigate('/admintable')
}

const handlelinks=(pram)=>{
  console.log(pram)
  navigate(`/ticketfilter/${pram}`)

}

    return Accesspage&&loading&&(
        <section>
            <LogNavbar page='Admin'/>
            <section className="content"> 
            {Status&&
            <section className="viewticket" style={{minHeight:'85vh',backgroundColor:'inherit'}}>
            <section className="divbox" >
            <div>
                    <h4>Total Tickets</h4>
                    <h4>{Status.Total}</h4>
                    
                </div>
                <div  style={{backgroundColor:' rgba(255, 0, 0, 0.745)'}}>
                    <h4>Pending Tickets</h4>
                    <h5>{Status.Pending}</h5>
                    
                </div>
                <div style={{backgroundColor:' rgba(30, 195, 44, 0.499)'}}>
                    <h4>Solved </h4>
                    <h4>{Status.Solved}</h4>
                   
                    </div> 
                    <div style={{backgroundColor:'rgba(60, 30, 195, 0.499)'}}>
                    <h4>Unassigned</h4>
                    <h4>{Status.Unassigned}</h4>
                    
                </div>
               
               
                
               

            </section >
          
            <section className="graph">
              <div style={{width:'600px',height:'400px'}}>
              {chart?( <Barchart data={Status}/>):(<Piechart data={Status}/>)}
              
              </div>
          <div className="graphLinks" style={{width:'50%'}}>
            <button style={{width:'200px'}} onClick={()=>(handlelinks('Pending'))}>View Pending tickets</button>
            <button style={{width:'200px'}} onClick={()=>(handlelinks('Solved'))}>Solved Tickets</button>
            <button style={{width:'200px'}} onClick={()=>(handlelinks('Unassigned'))}>Unassigned</button>
            <button style={{width:'200px'}} onClick={linktoallticket}>view All Tickets </button>
            <button style={{width:'200px'}} onClick={changechart}>{chart?("Pie Chart"):("Bar Chart")}</button>
          </div>
            </section>
           
          </section>}
            </section>
        </section>
    )
}