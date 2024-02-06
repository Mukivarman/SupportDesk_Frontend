import React, { useEffect } from "react";
import LogNavbar from "../components/navbar";
import Piechart from "../components/Piecharts";
import { useState } from "react";
import Barchart from "../components/Barcharts";
import { checkalreadyclint } from "../js/tools";
import { useNavigate } from "react-router-dom";
import Buttons from "../components/Buttons";
import Divs from "../components/DivsInStatuspage";
import LoadingBar from "../components/Loadings";


export default function SupportTeamHomePage(){
  const theme=localStorage.getItem('theme')
    const [Status,setStatus]=useState(null)
    const [chart,setchart]=useState(true)
    const navigate=useNavigate()
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [Accesspage,setAccesspage]=useState(false)
    const [loading,setloading]=useState(false)

     useEffect(()=>{
      if(user){
        const thispage='SupportTeam'
          checkalreadyclint(user,setAccesspage,navigate,thispage)
      }
      else{
          navigate('/Login')
      }

    
},[])

    useEffect(()=>{
        const fetching=async()=>{
          const Data=  await fetch('https://supportdesk-hm1g.onrender.com/api/SupportTeamMemberHomePage',{
            method:'Get',
            headers:{
                'Content-Type': 'application/json',  
                'authorization':`Bearer ${user.jwttoken}`
            }
          })
    if(Data.ok){
        const getdata=await Data.json()
        console.log(getdata)
        setStatus(getdata)
        setloading(true)
        
}else{
  console.log(await Data.json())
}

        }
        if(Accesspage){
          if(user.power==='SupportTeam'){
            fetching()
          }
        }
        
    },[Accesspage])




    return loading?Accesspage&&(
        <section className={theme==='light'?'light':'dark'}>
          
            <section className="content"> 
           
            {Status&&
            <section className="viewticket" style={{backgroundColor:'inherit'}}>
            <h3 style={{textAlign:'center'}}>Support User</h3>
            <section className="divbox" >
                <Divs text='Total Tickets' data={Status.Total} bg=''/>
                <Divs text='Solved  Tickets' data={Status.Solved} bg='green'/>
                <Divs text='Pending Tickets'data={Status.Pending} bg='red'/>
                <Divs text='On Waiting' data={Status.Waiting} bg='blue'/>
                <Divs text='On Hold' data={Status.OnHold} bg='rgb(255, 128, 128)'/>
            </section >
          
            <section className="graph">

              <div style={{width:'100%',height:'400px'}}>
                 {chart?( <Barchart data={Status}/>):(<Piechart data={Status}/>)}
              </div>

          <div className="graphLinks" style={{width:'50%'}}>
              <Buttons linkto='Total' text='View My Assign Tickets' setchart={setchart} navigate={navigate}/> 
              <Buttons linkto='Pending' text='View Pending tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto="Solved"  text='Solved Tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto='linktoallticket' text='Take New Tickets' setchart={setchart} navigate={navigate}/>
              <Buttons linkto='changechart' text={chart?("Pie Chart"):("Bar Chart")} setchart={setchart} chart={chart}/>
          </div>
            </section>
           
          </section>}
            </section>
        </section>
    ):<div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundcolor: "#201f32df" }}        >
    <LoadingBar type='bars' color='black' />
    </div>
}