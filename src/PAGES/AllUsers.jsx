import React, { useState } from "react";
import LogNavbar from "../components/navbar";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
import AllUsersFilter from "../components/AllUsersfilter";


export default function AllUsers(){
  const theme=localStorage.getItem('theme')
    const navigate=useNavigate()
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [Accesspage,setAccesspage]=useState(false)
   
    
       
    useEffect(()=>{
  
        if(user){
          const thispage='Admin'
            checkalreadyclint(user,setAccesspage,navigate,thispage)
        }
        else{
            navigate('/Login')
        }
      
  },[])



    return Accesspage&&(
     <section className={theme==='light'?'light':'dark'}>
      
        <LogNavbar page={user.power}/>
        <section className="content">

        <section className="AllTickets" style={{width:'80%'}}>
        <div className="allticketsdetails">
           
         <div className="navlinks-allusers">
            <NavLink to='Filterby/User' >User</NavLink>
            <NavLink to='Filterby/SupportTeam' >Support Team</NavLink>
            <NavLink to='Filterby/Admin' >ADmin</NavLink>
          </div> 
            <Outlet />
          
           
               
        </div>
            </section>
        </section>
     </section>
    )
}