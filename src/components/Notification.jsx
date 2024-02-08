import React, { useEffect, useState }  from "react";
import { useNavigate } from "react-router-dom";
import { fetch_Api } from "../js/tools";

export default function Notification(props){
    const navigate=useNavigate()
    const [list,setlist]=useState(null)
    useEffect(()=>{

        const getdata=async()=>{
            const req=await fetch_Api('api/getnotification',"Get",props.user.jwttoken)

            if(req.Res){
                    const data=req.data
                    console.log(data.Notification)
                    setlist(data.Notification)
            }
            
        }


        getdata()

         

      
    },[])
    const handlenavigate=async(li)=>{
        await fetch_Api(`api/deletenotification/${li._id}`,"Delete",props.user.jwttoken)
    
        navigate(`/ViewTicketDetails/${li.ticket}`)
    }

const Li=(li)=>(
    <li onClick={()=>(handlenavigate(li.list))} >{li.list.alerts}</li>
)




return (
    <section style={{height:"300px",overflowY:'scroll'}}>
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