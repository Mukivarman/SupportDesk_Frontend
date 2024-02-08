import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";
import Loadingicon from "../components/loading";
import { fetch_Api } from "../js/tools";



export default function AllSupportTeamList(props){
    const theme=localStorage.getItem('theme')
    const {ticketid}=useParams()

    const [List,seTList]=useState(null)
    const navigate=useNavigate()
    const [Accesspage,setAccesspage]=useState(false)
     const [loading,setloading]=useState(false)
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [iconload,seticonload]=useState(false)
    
    useEffect(()=>{
  
        if(user){
          const thispage="Admin"
            checkalreadyclint(user,setAccesspage,navigate,thispage)
        }
        else{
            navigate('/Login')
        }
      
  },[])
  const GetDatas=async()=>{
  
     Data=await fetch_Api('api/supportteamlist','Get',user.jwttoken)
  
          if(Data.Res){
            seTList(Data.data);
         
            setloading(true)
          }else{
            setloading(true)
            console.log(Data.msg)
          }
  
  }
  
    useEffect(()=>{
      
  if(Accesspage){
    const get=GetDatas()
  }

    },[Accesspage])


    const handleAssingn=async(id,list)=>{
        seticonload(true)
            const detail={
                ticketid:id,
                supportteamid:list._id,
            }
            const assign=await fetch_Api('api/Assign','Post',user.jwttoken,JSON.stringify(detail))
  
            if(assign.Res){
                seticonload(false)
                navigate(`/ViewTicketDetails/${id}`)
              setloading(true)
            }else{
               
              console.log(Data.msg)
            }
    
    }
       
    

return Accesspage&&loading&&(
    <section className={theme==='light'?'light':'dark'}>
      
    <section className="content">
    <section className="AllTickets" style={{width:'100%'}}>
    <div className="allticketsdetails">
        <table>
            <thead>
                <tr>
                    <th>s.no</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Actions</th>
                  
                </tr>
            </thead>
            <tbody>
                {List&&List.map((list,index)=>(
                <tr key={list._id}>
                    <td>{index+1}</td>
                    <td>{list.username}</td>
                    <td>{list.email}</td>
                    <td>
                        {iconload?<Loadingicon/>:<button style={{margin:"auto"}} onClick={()=>(handleAssingn(ticketid,list))}>Assign</button>}</td>
                </tr>))}
            </tbody>
        </table>
</div>
    </section>
    </section>
    </section>
)
}