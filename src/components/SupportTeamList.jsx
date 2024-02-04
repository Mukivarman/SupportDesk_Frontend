import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LogNavbar from "./navbar";
import { checkalreadyclint } from "../js/tools";



export default function AllSupportTeamList(props){
    const theme=localStorage.getItem('theme')
    const {ticketid}=useParams()
console.log(ticketid)
    const [List,seTList]=useState(null)
    const navigate=useNavigate()
    const [Accesspage,setAccesspage]=useState(false)
     const [loading,setloading]=useState(false)
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    
    useEffect(()=>{
  
        if(user){
          const thispage=user.power
            checkalreadyclint(user,setAccesspage,navigate,thispage)
        }
        else{
            navigate('/Login')
        }
      
  },[])

    useEffect(()=>{
        const getteam=async()=>{
        const fetchData=await fetch('/api/supportteamlist',{
            method:'Get',
            headers:{
                'Content-Type': 'application/json',
                'authorization':`Bearer ${user.jwttoken}`
            },
        })
        if(fetchData.ok){
            const getdata=await fetchData.json()
            seTList(getdata);
            console.log(List)
            setloading(true)
        }
    }
    getteam()

    },[])


    const handleAssingn=async(id,list)=>{

            const detail={
                ticketid:id,
                supportteamid:list._id,
            }

         const assign=await fetch('/api/Assign',{
            method:'post',
            headers:{
                'Content-Type':'Application/json',
                'authorization':`Bearer ${user.jwttoken}`
            },
            body:JSON.stringify(detail)
         })
         if(assign.ok){
            navigate(`/ViewTicketDetails/${id}`)
         }else{
            console.log(await assign.json())
         }
    }

return Accesspage&&loading&&(
    <section className={theme==='light'?'light':'dark'}>
        <LogNavbar page={user.power}/>
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
                    <td><button style={{margin:"auto"}} onClick={()=>(handleAssingn(ticketid,list))}>Assign</button></td>
                </tr>))}
            </tbody>
        </table>
</div>
    </section>
    </section>
    </section>
)
}