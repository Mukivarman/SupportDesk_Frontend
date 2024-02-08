import React, { useEffect, useState } from "react";
import { fetch_Api } from "../js/tools";

export default function Details(props){
const [Data,setData]=useState(null)

    const getdata=async()=>{
        const req=await fetch_Api('api/GetUserStatus','Get',props.user.jwttoken)
        if(req.Res){
            setData(req.data)
        }
        else{
            console.log(req.msg)
        }
    } 
    useEffect(()=>
    {
getdata()
    },[])
  const DivDetail=(props)=>(<div style={{display:'flex'}}> 
  <h3 className="field">{props.text}</h3>-
  <h3 className="fielddata">{props.output}</h3>
    </div>
 )
    return(
    <div className="details">
       <h3 style={{padding:'5px',textAlign:"center",color:'white',borderBottom:'1px solid  white'}}>User Statistics </h3>
        <br/> 
        {Data&&<div style={{display:'flex',flexDirection:'column'}}>
        <DivDetail text='TotalTickets'  output={Data.Total}/>
     <DivDetail text='Pending' output={Data.Pending}/>
     <DivDetail text='Solved' output={Data.Solved}/>
     <DivDetail text='OnHold' output={Data.OnHold}/>
     <DivDetail text='waiting' output={Data.Waiting}/>
       </div> }
    
 
 
  </div>
    )
}