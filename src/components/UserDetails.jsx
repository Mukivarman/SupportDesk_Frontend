import React, { useState } from "react";
import LogNavbar from "../components/navbar";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { checkalreadyclint } from "../js/tools";
import DialogBox from "./OpenDialogue";
import Success,{Failed} from "./Responses";

export default function UserDetail(props){
   
    const [data,setdata]=useState(props.data)
    const navigate=useNavigate()
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    const [Accesspage,setAccesspage]=useState(false)
    const [Listdata,setListdata]=useState(null)
    const [dialogbox,setdialogbox]=useState(false)
    const [Confirm,setConfirm]=useState(false)
    const [response,setresponse]=useState(0)
    const [msg,setmsg]=useState('')
    const theme=localStorage.getItem('theme')

    
    
       
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
    if(Accesspage){
        if(data.power!=='Admin'){
            GetData()
        }
       
    }
  },[Accesspage])


  const GetData=async()=>{

    const  res =await fetch(`https://supportdesk-hm1g.onrender.com/api/GetAllTicketsLISTby/${data._id}/${data.power}`,
    {
        method:'Get',
        headers:{
            'Content-Type': 'application/json',  
            'authorization':`Bearer ${user.jwttoken}`
        }
    })
    if(res.ok){
        const List=await res.json()
        setListdata(List)
    }
    else{
        console.log(await res.json())
    }
  }
useEffect(()=>{
    if(Confirm){
        deleteuser()
    }
},[Confirm])

const deleteuser= async()=>{
    console.log('clicked')
    const req=await fetch(`https://supportdesk-hm1g.onrender.com/api/DeleteUser/${data._id}/${data.power}`,{
        method:'Delete',
        headers:{
            'Content-Type': 'application/json',  
            'authorization':`Bearer ${user.jwttoken}`
        }
    })
    if(req){
        const resmsg=await req.json()
        setmsg(resmsg.msg)
        setresponse(1)
        
        
    }
    else{
        const resmsg=await req.json()
        setmsg(resmsg.msg)
        setresponse(-1)
    }
    


}

const handledilogbox=(datas)=>{
    setdialogbox(datas)

}
const handleresponse=(datas)=>{
    setresponse(datas)
   
        window.location.reload()
}

const handleconfirm=(datas)=>{

    setConfirm(datas)
    setdialogbox(!datas)
  

}


  const DivDetail=(props)=>(<div style={{display:'flex'}}> 
                            <h3 className="field">{props.text}</h3>
                            <h3 className="fielddata">{props.output}</h3>
                              </div>
                           )

return Accesspage&&data&&(<section className={theme==='light'?'light':'dark'} style={{padding:'2%'}}>
       
      <section style={{paddingLeft:'10%'}} >
        <DivDetail text='Username' output={data.username}/>
        <DivDetail text='Email' output={data.email}/>      
        <DivDetail text='Power' output={data.power}/>
        <DivDetail text='Department' output={data.department?data.department:'NO dept'}/>
        <DivDetail text='Empcode' output={data.EmployeeCode?data.EmployeeCode:0}/>
      </section>
      <div style={{display:'flex'}}>
        <button 
            style={{backgroundColor:'green',border:'2px solid black'}}
                onClick={()=>{
                setdata(null)
                props.exit(false)
            }}>Go back</button>

      <button
             onClick={()=>(setdialogbox(true))} 
             style={{backgroundColor:' rgba(231, 79, 19, 0.929)',border:'2px solid black'}}
             >Delete  This User
             </button>
      </div>

      {dialogbox===true&&(
        <DialogBox heading='Delete the User '
         text=' Please Note That Tickets Not Delete if The User  Deleted'
         color='rgba(239, 81, 7, 0.753)'
        exit={handledilogbox}
        do={handleconfirm}
         
         />
      )}
      { response===1&&<Success data={msg}  exit={handleresponse}/>}
      {response===-1&&<Failed data={msg} exit={handleresponse}/>}
      
    
      
     { data&&Listdata&&data.power!=='Admin'&&<section>
      <div style={{textAlign:'center',padding:'1%'}}><h2>All Tickets BY This User</h2></div>
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
                {Listdata&& Listdata.map((data,index)=>(
                   <tr key={data._id}>
                       <td className="sno">{index}</td>
                       <td className="ticketid">{data._id}</td>
                       <td className="ticketdate"> { new Date(data.OccuredDate).toLocaleDateString()+" ~ "+data.OccuredTime}</td>
                       <td className="subject">{data.Subject} </td>
                       <td className="other">{data.AssignedUser===null?('Not Assigned'):(data.AssignedUser.username)}</td>
                       <td className="other">{data.Status} </td>
                       <td  ><button onClick={()=>navigate(`/ViewTicketDetails/${data._id}`)}>view Ticket Details</button></td>
                    </tr> ))}
                </tbody>
            </table>
      </section>}
</section>)
}