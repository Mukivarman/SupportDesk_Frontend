import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";
import { NavLink, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import UserDetail from "./UserDetails";


export default function AllUsersFilter(){
    
    const {filter}=useParams()
    const navigate=useNavigate()
     const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [Accesspage,setAccesspage]=useState(false)
    const [loading,setloading]=useState(false)
    const [Data,setData]=useState(null)
    console.log(filter)
    const [viewuser,setviewuser]=useState(false)
    const [viewuserdata,setviewuserdata]=useState(null)
    

    useEffect(()=>{
  
        if(user){
            console.log('hit')
          const thispage='Admin'
            checkalreadyclint(user,setAccesspage,navigate,thispage)
        }
        else{
            navigate('/Login')
        }
      
  },[])
  

    
  useEffect(()=>{
     setData(null)

    const fetchData = async () => {
       
      try { const getdata=await fetch(`https://supportdesk-hm1g.onrender.com/api/AllUsersByAdmin/${filter}`,{
         method:'Get',
         headers:{
            'Content-Type': 'application/json',  
           'authorization':`Bearer ${user.jwttoken}`
        },
       

      })
      if(getdata.ok){
         const users=await getdata.json()
         console.log(users.data)
         setData(users.data);
         setloading(true)

      }else{
        console.log(await getdata.json())
      }
       
      } catch (error) {
        console.error(error);
      }
    };
    if(user&&Accesspage){
      fetchData();     
    }

  },[Accesspage,filter])

const exit=(datas)=>{
  setviewuser(datas)
}


  return Accesspage&&loading&&!viewuser?(
      ( <table>
            <thead>
                <tr>
                    <th>S.No</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Joined Date</th>
            {filter==='User'&&
                    <React.Fragment>
                        <th>Department</th>
                        <th>EmployeeCode</th>
                        <th>Total Tickets</th>
                     </React.Fragment>
                    }
            {filter==='SupportTeam'&&
                    <th>Total Aissigned Tickets</th>
                   
            }
                   
                    <th>View</th>
                </tr>
            </thead>
         
            <tbody>
     {Data&& Data.map((data,index)=>(
         <tr key={data._id}>
                <td>{index+1}</td>
                <td>{data.username}</td>
                <td>{data.email}</td>
                <td>{new Date(data.CreatedAT).toLocaleDateString()}</td>
            {filter==='User'&&
              <React.Fragment>
                <td>{data.department?data.department:0}</td>
                <td>{data.EmployeeCode?data.EmployeeCode:0}</td>
                <td>{data.CreatedTickets?data.CreatedTickets.length:0}</td>
               </React.Fragment>}
          
            {filter==='SupportTeam'&&
             <td>{data.Assignedtickets?data.Assignedtickets.length:0}</td>
            }
             
           
         
                <td><button 
                onClick={
                      ()=>{
                            setviewuser(true)
                            setviewuserdata(data)
                    }}>
                      View User Deatails
                      </button></td>
                
                </tr> ))}
            </tbody>
        </table>
      
  )):
 ( viewuser&&viewuserdata&&<UserDetail data={viewuserdata} exit={exit} />)
  
  

}
