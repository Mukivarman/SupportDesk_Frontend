import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";

export default function Notification(props){
    const navigate=useNavigate()
    const [list,setlist]=useState(null)
    useEffect(()=>{

        const getdata=async()=>{

            const req=await fetch('https://supportdesk-hm1g.onrender.com/api/getnotification',{
                method:'Get',
                headers:{
                    'Content-Type': 'application/json',  
                    'authorization':`Bearer ${props.user.jwttoken}`
                }
            })
            if((req).ok){
                    const data=await req.json()
                    console.log(data.Notification)
                    setlist(data.Notification)
            }
            
        }


        getdata()

         

      
    },[])
    const handlenavigate=async(li)=>{
        await fetch(`https://supportdesk-hm1g.onrender.com/api/deletenotification/${li._id}`,
        {
            method:'Get',
            headers:{
                'Content-Type': 'application/json',  
                    'authorization':`Bearer ${props.user.jwttoken}`
            }
        })
    
        navigate(`/ViewTicketDetails/${li.ticket}`)
    }

const Li=(li)=>(
    <li onClick={()=>(handlenavigate(li.list))} >{li.list.alerts}</li>
)




return (
    <section>
      <h2 style={{ textAlign: 'center', marginBottom: '3%',borderBottom:'1px solid white'}}>Notifications</h2>
      <br/>
      {!list && <p style={{ textAlign: 'center', margin: '10px' }}>No Notification</p>}
      <ul>
        {list &&
          list.map((notification, i) => (
            <Li key={i + 1} list={notification} />
          ))}
      </ul>
    </section>
  );
  
}