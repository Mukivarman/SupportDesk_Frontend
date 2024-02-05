import React, { Component, useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
export default function SupportTeam_AllTickets(){
  const navigate=useNavigate()
  const theme=localStorage.getItem('theme')
    const [Data,setData]=useState(null)
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [Accesspage,setAccesspage]=useState(false)
    const [loading,setloading]=useState(false)

    useEffect(()=>{
   
        

     if(user){
      const thispage="SupportTeam"
         checkalreadyclint(user,setAccesspage,navigate,thispage)
         
     }
     else{
         navigate('/Login')
     }

   
},[])

   
   
    useEffect(()=>{
        const fetchData = async () => {
          try {
             const getdata=await fetch('https://supportdesk-hm1g.onrender.com/api/GetAllTickets',{
             method:'Get',
             headers:{
                'Content-Type': 'application/json',  
                'authorization':`Bearer ${user.jwttoken}` 
            },
           

          })
          if(getdata.ok){
             const tickets=await getdata.json()
            
             setData(tickets);
             setloading(true)

          }else{
            console.log(await getdata.json())
            setloading(false)
          }
           
          } catch (error) {
            console.error(error);
          }
        
        };
       if(Accesspage){
          fetchData();
       }     
        
      },[Accesspage])

     const confirm=(data)=>{
         console.log(data._id)
         navigate(`/ViewTicketDetails/${data._id}`)
         
           
      }
    return Accesspage&&loading&&(
      <section className={theme==='light'?'light':'dark'}>
        <LogNavbar page={user.power}/>
        <section className="content">
          <section className="AllTickets" style={user.power !== 'User' ? { width: '100%' } : {}}>
           
        <div className="allticketsdetails">
            <h2 style={{textAlign:"center",margin:"5px"}}>Take New Ticket</h2>
           <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Assign</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
             
                <tbody>
                {Data&& Data.map((data,index)=>(
                   <tr key={data._id}>
                       <td className="sno">{index}</td>
                       <td className="ticketid">{data._id}</td>
                       <td className="ticketdate">{new Date(data. OccuredDate).toLocaleDateString()+"-"+data.OccuredTime}</td>
                       <td className="subject">{data.Subject} </td>
                       <td className="other">{data.AssignedUser===null?('Not Assigned'):(data.AssignedUser.username)}</td>
                       <td className="other">{data.Status} </td>
                      <td className="other">{data.AssignedUser===null?(<button onClick={()=>confirm(data)}>Take</button>):("Already Assign")}</td>
                    </tr> ))}
                </tbody>
            </table>
            {!loading&&<p style={{textAlign:'center', margin:'25%'}}>Content Is Loading....</p>}
          </div>
         </section>
       </section>
    </section>
    )
}