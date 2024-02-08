import React, { Component, useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
import LoadingBar from "../components/Loadings";
import { fetch_Api } from "../js/tools";



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
            const getdata=await fetch_Api('api/GetAllTickets','Get',user.jwttoken)
  
            if(getdata.Res){
             
              setData(getdata.data)
              setloading(true)

              
            }else{
              console.log(Data.msg)
              setloading(true)
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
         setloading(false)
         navigate(`/ViewTicketDetails/${data._id}`)
         
           
      }
    return Accesspage&&loading?(
      <section className={theme==='light'?'light':'dark'}>
      
        <section className="content">
          <section className="AllTickets" style={user.power !== 'User' ? { width: '100%' } : {}}>
           
        <div className="allticketsdetails">
            <h2 style={{textAlign:"center",margin:"5px"}}>Take New Ticket</h2>
           <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>ID</th>
                        <th>OccuredDate</th>
                        <th>Subject</th>
                        <th>Assign</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
             
                <tbody>
                {Data&& Data.map((data,index)=>(
                   <tr key={data._id}>
                       <td className="sno">{index}</td>
                       <td className="ticketid">{data._id}</td>
                       <td className="ticketdate">{new Date(data. OccuredDate).toLocaleDateString()+"-"+new Date(data.OccuredDate).toLocaleTimeString()}</td>
                       <td className="subject">{data.Subject} </td>
                       <td className="other">{data.AssignedUser===null?('Not Assigned'):(data.AssignedUser.username)}</td>
                       <td className="other"> {new Date(data.CreatedAt).toLocaleDateString()+"-"+new Date(data.CreatedAt).toLocaleTimeString()}</td>
                      <td className="other">{data.AssignedUser===null?(<button onClick={()=>confirm(data)}>Take</button>):("Already Assign")}</td>
                    </tr> ))}
                </tbody>
            </table>
            {!loading&&<p style={{textAlign:'center', margin:'25%'}}>Content Is Loading....</p>}
          </div>
         </section>
       </section>
    </section>
    ): <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : {  backgroundcolor: "#201f32df" }}        >
    <LoadingBar type='bars' color='black' />
    </div>
}