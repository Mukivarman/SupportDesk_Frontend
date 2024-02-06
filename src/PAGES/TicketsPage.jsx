import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
import LoadingBar from "../components/Loadings";

export default function ShowAllTickets(){
      const navigate=useNavigate()
      const [Data,setData]=useState(null)
      const theme=localStorage.getItem('theme')
      const userString = localStorage.getItem("loguser");
      const user = userString ? JSON.parse(userString) : null;
      const [Accesspage,setAccesspage]=useState(false)
      const [loading,setloading]=useState(false)
 
      useEffect(()=>{
     
          
 
       if(user){
        const thispage='User'
           checkalreadyclint(user,setAccesspage,navigate,thispage)
       }
       else{
           navigate('/Login')
       }
 
     
 },[])
      
    

      useEffect(()=>{
         
        const fetchData = async () => {
          try { const getdata=await fetch('https://supportdesk-hm1g.onrender.com/api/GetTicketByUSer-All',{
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
          else{
            console.log(await getdata.json())
          }
           
          } catch (error) {
            console.error(error);
          }
        };
        if(Accesspage){
          fetchData();     
        }

      },[Accesspage])


 return Accesspage&&loading?(
      <section className={theme==='light'?'light':'dark'}>
  
        <section className="content">
       
            <section className="AllTickets">
        <div className="allticketsdetails">
            <h2 style={{textAlign:"center",marginBottom:"5px"}}>My Tickets</h2>
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
                       <td className="ticketdate">  {new Date(data.OccuredDate).toLocaleDateString()}-
                        {data.OccuredTime}</td>
                       <td className="subject">{data.Subject} </td>
                       <td className="other">{data.AssignedUser===null?('Not Assigned'):(data.AssignedUser.username)}</td>
                       <td className="other">{data.Status} </td>
                       <td className="other"><button onClick={()=>navigate(`/ViewTicketDetails/${data._id}`)}>view</button></td>
                    </tr> ))}
                </tbody>
            </table>
            {!loading&&
             <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundcolor: "#201f32df" }}        >
                <LoadingBar type='bars' color='black' />
            </div>}
        </div>
            </section>
   
        <SideBar/>
        </section>
        </section>
    )
    : 
    <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundcolor: "#201f32df" }}        >
    <LoadingBar type='bars' color='black' />
    </div>
}