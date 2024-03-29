import React, { useState } from "react";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
import LoadingBar from "../components/Loadings";
import { fetch_Api } from "../js/tools";

export default function AdminShowAllTickets(){
     const theme=localStorage.getItem('theme')
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

  const GetDatas=async()=>{
  
    const FetchData=await fetch_Api('api/GetAllTickets','Get',user.jwttoken)
  
          if(FetchData.Res){
              
            setData(FetchData.data);
            setloading(true)

          }else{
            console.log(FetchData.msg)
          }
  
  }
  
      useEffect(()=>{

    
        if(user&&Accesspage){
        GetDatas()  
        }

      },[Accesspage])


    return Accesspage&&loading?(
      <section className={theme==='light'?'light':'dark'}>
 
        <section className="content">
        <section className="AllTickets" style={{width:'100%'}}>
        <div className="allticketsdetails">
            <h2 style={{textAlign:"center",marginBottom:"5px"}}>All Tickets</h2>
           <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>ID</th>
                        <th>Date Time</th>
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
                       <td className="ticketdate"> { new Date(data.OccuredDate).toLocaleDateString()+" ~ "+new Date(data.OccuredDate).toLocaleTimeString()}</td>
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
    ): <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundColor: 'rgba(1, 255, 255, 0.286)',backdropFilter:'blur(5px)' }}        >
    <LoadingBar type='bars' color='black' />
    </div>
}