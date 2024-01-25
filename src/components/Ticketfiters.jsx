import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LogNavbar from "./navbar";
import { checkalreadyclint } from "../js/tools";
import SideBar from "./Sidebar";


export default function TicketFilterpge(){
    const {filter}=useParams()

    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    console.log(user)
    const [Accesspage,setAccesspage]=useState(false)
    const [loading,setloading]=useState(false)
    
console.log(filter)
    const [List,seTList]=useState(null)
    const navigate=useNavigate()

    useEffect(()=>{
console.log('1 render')
            if(user){
             const thispage=user.power
                checkalreadyclint(user,setAccesspage,navigate,thispage)
            }
            else{
                navigate('/Login')
            }
         
        
      
  },[])

    useEffect(()=>{
        console.log('2 render')
        const getdata=async(links)=>{
        const fetchData=await fetch(links,{
            method:'Get',
            headers:{
                'Content-Type': 'application/json',
                'authorization':`Bearer ${user.jwttoken}`
            },
        })
        if(fetchData.ok){
            const getdata=await fetchData.json()
            seTList(getdata);
            console.log(getdata)
            console.log(List)
            setloading(true)
        }
    }
    if(filter){
        if(user.power==='Admin'){
        const links=`/api/filters/${filter}`
                getdata(links)

        }
        if(user.power==='SupportTeam'){
            const links=`/api/SupportTeamclintdetails/${filter}`
            getdata(links)
        }
        if(user.power==='User'){
            const links=`/api/userfilters/${filter}`
            getdata(links)
        }

}

    },[filter])


   
    

return Accesspage&&loading&&(
    <section >
       
        <LogNavbar page={user.power}/>
    <section  className="content">
     <section className="AllTickets" style={user.power !== 'User' ? { width: '100%' } : {}}>
     <div className="allticketsdetails">
        <table >
            <thead>
                <tr>
                    <th>s.no</th>
                    <th>Occured Date</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Assigned User</th>
                    <th>department</th>
                    <th>Actions</th>
                  
                </tr>
            </thead>
            <tbody>
                {List&&List.map((list,index)=>(
                <tr key={list._id}>
                    <td>{index+1}</td>
                    <td>{new Date(list.OccuredDate).toLocaleDateString()+"-"+list.OccuredTime}</td>
                    <td>{list.Subject}</td>
                    <td>{list.Status}</td>
                    <td>{list.AssignedUser===null?('Not Assigned'):(list.AssignedUser.username)}</td>
                    <td>Any</td>
                    <td><button style={{margin:"auto"}} onClick={()=>navigate(`/ViewTicketDetails/${list._id}`)}>view</button></td>
                </tr>))}
            </tbody>
        </table>
</div>
    </section>
    </section>
    {user.power==='User'&&  <SideBar/>} 
    
    </section>
)
}