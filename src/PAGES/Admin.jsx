import React, { useEffect } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { Link, Navigate } from "react-router-dom";

import Piechart from "../components/Piecharts";
import { useState } from "react";
import Barchart from "../components/Barcharts";
import { useNavigate } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";
import Buttons from "../components/Buttons";
import Divs from "../components/DivsInStatuspage";



export default function Adminpage(){
    const theme=localStorage.getItem('theme')
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
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
          const Data=  await fetch('https://supportdesk-hm1g.onrender.com/api/status',{
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
        
}else{
  console.log(await Data.json())
}
        }
if(user&&Accesspage){
        fetching()
}
    },[Accesspage]);

   




    return Accesspage&&loading&&(
     <section className={theme==='light'?'light':'dark'}>
    
        <section className="content"> 
          {Status&&
      <section className="viewticket" style={{minHeight:'85vh',backgroundColor:'inherit'}}>
           <section className="divbox" >
                <Divs text='Total Tickets' data={Status.Total} bg=''/>
                <Divs text='Solved  Tickets' data={Status.Solved} bg='green'/>
                <Divs text='Pending Tickets'data={Status.Pending} bg='red'/>
                <Divs text='Waiting' data={Status.Waiting} bg='blue'/>
                <Divs text='On Hold' data={Status.OnHold} bg='rgb(255, 128, 128)'/>
                <Divs text='Unassigned' data={Status.Unassigned} bg='rgb(17, 166, 166)'/>

         </section >
          
        <section className="graph">
          <div style={{width:'600px',height:'400px'}}>
              {chart?( <Barchart data={Status}/>):(<Piechart data={Status}/>)}
           </div>
           <div className="graphLinks" style={{width:'50%'}} >
              <Buttons linkto='Pending' text='View Pending tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto="Solved"  text='Solved Tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto='Unassigned' text='Unassigned Tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto='Alltickets' text='view All Tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto='changechart' text={chart?("Pie Chart"):("Bar Chart")} setchart={setchart} chart={chart}/>
          </div>
            </section>
           
          </section>}
            </section>
        </section>
    )
}