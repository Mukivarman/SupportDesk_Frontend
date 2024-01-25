import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";

export default function AdminShowAllTickets(){
      const navigate=useNavigate()
     const [Data,setData]=useState(null)

      const userString = localStorage.getItem("loguser");
      const user = userString ? JSON.parse(userString) : null;
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

        const fetchData = async () => {
          try { const getdata=await fetch('/api/GetAllTickets',{
             method:'Get',
             headers:{
                'Content-Type': 'application/json',  
                  'authorization':`Bearer ${user.jwttoken}`
            },
           

          })
          if(getdata.ok){
             const tickets=await getdata.json()
             console.log(tickets)
             setData(tickets);
             setloading(true)

          }
           
          } catch (error) {
            console.error(error);
          }
        };
        if(user&&Accesspage){
          fetchData();     
        }

      },[Accesspage])


    return Accesspage&&loading&&(
      <section>
   <LogNavbar page={user.power}/>
        <section className="content">
       
            <section className="AllTickets" style={{width:'80%'}}>
        <div className="allticketsdetails">
            <h2 style={{textAlign:"center",marginBottom:"5px"}}>All Tickets</h2>
           <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Assign</th>
                        <th>Status</th>
                        <th>View</th>
                    </tr>
                </thead>
             
                <tbody>
                {Data&& Data.map((data,index)=>(
                   <tr key={data._id}>
                       <td className="sno">{index}</td>
                       <td className="ticketid">{data._id}</td>
                       <td className="ticketdate">{data. OccuredDate}</td>
                       <td className="subject">{data.Subject} </td>
                       <td className="other">{data.AssignedUser===null?('Not Assigned'):(data.AssignedUser.username)}</td>
                       <td className="other">{data.Status} </td>
                       <td className="other"><button onClick={()=>navigate(`/ViewTicketDetails/${data._id}`)}>view</button></td>
                    </tr> ))}
                </tbody>
            </table>
        </div>
            </section>
        </section>
        </section>
    )
}