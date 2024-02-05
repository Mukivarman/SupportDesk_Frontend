import React, { useEffect, useState } from "react";
import LogNavbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chatbox from "../components/Chat";
import { checkalreadyclint } from "../js/tools";

export default function ViewTicket(){
    const theme=localStorage.getItem('theme')
   const [Data,setData]=useState(null);
   const {ticketid}=useParams()
   const [Fullimg,setFullimg]=useState(false)
   const [Statusoption,setStatusoption]=useState('Select')
   const [UpdateRes,setUpdateRes]=useState(-1)
   const navigate=useNavigate()
   const userString = localStorage.getItem("loguser");
   const [user,setuser] = useState( JSON.parse(userString))
   const [takederror,settakeerror]=useState('')
   const [Accesspage,setAccesspage]=useState(false)
   const [loading,setloading]=useState(false)
   const [Enablechat,setEnablechat]=useState(false)

  useEffect(()=>{
 
   if(user){
    const thispage=user.power
       checkalreadyclint(user,setAccesspage,navigate,thispage)
   }
   else{
       navigate('/Login')
   }

 
},[ticketid])

    useEffect(() => {
        
        if(Accesspage){
            if(Data===null){
                fetchdata()
            }
       }
    }, [Accesspage,ticketid]);

    
    const fetchdata = async () => {
            
        try {
            console.log('getdata')
            const getdata = await fetch(`https://supportdesk-hm1g.onrender.com/api/GetOneTicket/${ticketid}`, {
                method: 'Get',
                headers: {
                    'Content-Type': 'application/json',
                   'authorization':`Bearer ${user.jwttoken}`
                },
            });

            if (getdata.ok) {
                const result = await getdata.json()
                setData(result);
                setStatusoption(result.Status)
                setloading(true)
            } 
            else{
                console.log(await getdata.json())

            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
   
    const fullscreenimg=()=>{
        setFullimg(!Fullimg)

    }


    const updateticket=async(id)=>{
        const data={
            status:Statusoption,
            ticketid:id
        }
     if(setStatusoption!=='Select'){
            const fetching=await fetch('https://supportdesk-hm1g.onrender.com/api/updateTicket',{
                method:'Post',
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${user.jwttoken}`
                },
                body:JSON.stringify(data)
            })
            if(fetching.ok){
                const a=await fetching.json()
                console.log(a)
                setUpdateRes(1)

            }else{
                setUpdateRes(0)
            
            }}



    }
    const taketicket=async(ticketid)=>{
       console.log(ticketid)
        const  taked=await fetch('https://supportdesk-hm1g.onrender.com/api/taketickets',{
            method:'Post',
            headers:{
                'Content-Type': 'application/json',
                'authorization':`Bearer ${user.jwttoken}`
            },
            body:JSON.stringify({Ticketid:ticketid})
        })
        if(taked.ok){
            console.log(await taked.json())
          window.location.reload()
        }
        else{
            settakeerror(true)
        }

    }

 
  
    return Accesspage&&loading&&(
        
        <section className={theme==='light'?'light':'dark'}>
        
              <LogNavbar page={user.power}/>
              <section  className="content">
              {!loading&&  <p 
              style={{textAlign:'center',margin:'auto',color:'white'}}
              >content is loading...</p>}

         {Data&&(
           <section className="viewticket">
             <section >
                <h2 className="viewsubject">Created Ticket</h2>
            <div style={{display:'flex'}}>
             <div className="viewticketfield">
                    <div style={{display:'flex'}}> 
                        <h3 className="field">Ticket Id :</h3>
                        <h3 className="fielddata">{Data._id}</h3>
                    </div>
                    <div style={{display:'flex'}}>
                        <h3 className="field">Occured Date : </h3>
                        <h3 className="fielddata">
                        { new Date(Data.OccuredDate).toLocaleDateString()+"-"+Data.OccuredTime}</h3>
                    </div> 
                   <div style={{display:'flex'}}>
                        <h3 className="field">Subject:</h3>
                        <h3 className="fielddata"> {Data.Subject}t</h3>
                    </div> 
                  <div>
                        <h3 className="field">Message:</h3>
                      <h3 className="textarea">{Data.Message} </h3>
                  </div  > 



             </div>
                <div style={{width:'50%' ,display:'flex',flexDirection:'column',justifyContent:'center',padding:"2%"}}>
                  <a href="#fullimg"> <img 
                        style={{width:'100%',height:"100%",maxHeight:"50vh"}} 
                        src={`data:image/jpeg;base64,${Data.Screenshots}`}
                        onClick={fullscreenimg}>
                    </img>
                    </a> 
                 <div style={{display:'flex'}}>  
                        <h3 className="field">Assigned Person:</h3>
                        <h3 className="fielddata">
                         {Data.AssignedUser===null?
                                    (user.power==="SupportTeam"?
                                       (<div><button onClick={()=>(taketicket(Data._id,user))}>Take</button>{takederror&&<p style={{color:'red'}}>Error</p>}</div>)
                                    :('Waiting To Assign')):(Data.AssignedUser.username)}</h3>
                 </div>
                 <div style={{display:'flex'}}> 
                         <h3 className="field">Opened :</h3>
                         <h3 className="fielddata"> 
                         {(Data.Opened)?"Opened":"Ticket is not Open"}</h3></div>
                
                 <div style={{display:'flex'}}> 
                         <h3 className="field">Status :</h3>
                        {user.power==='SupportTeam'&&(Data.AssignedUser)!==null&&(Data.AssignedUser.username)===user.user_name?
                                             (<select value={Statusoption} onChange={(e)=>(setStatusoption(e.target.value))} style={{width:'150px',height:'30px',backgroundColor:'inherit',color:'white'}}>
                                                  <option style={{backgroundColor:'black'}}>Select</option>
                                                  <option style={{backgroundColor:'black'}}>OnHold</option>
                                                  <option style={{backgroundColor:'black'}}>Pending</option>
                                                  <option style={{backgroundColor:'black'}}>Solved</option>
                                                </select>)
                                                :( <h3 className="fielddata">{Data.Status}</h3> )}
                  </div>
                  
                     {user.power==='Admin'&&Data.AssignedUser===null&&<button style={{width:'50%'}} onClick={()=>(navigate(`/allsupportteam/${Data._id}`))}>Assign</button>}
               <div style={{display:'flex'}}>
                     <h3> {user.power==='SupportTeam'&& (Data.AssignedUser)!==null&&(Data.AssignedUser.username)===user.user_name&&<button style={{margin:'0px',width:'150px'}} onClick={()=>(updateticket(Data._id))}> Update</button>} </h3>
                {UpdateRes===1&&<p>Updated</p>}{UpdateRes===0&&(<p>Error</p>)}
                </div>
                {(Data.AssignedUser)!==null&&Enablechat===false&&(<button onClick={()=>(setEnablechat(true))}>Chat</button>)}
                </div>
                </div>
                <div>
                {Enablechat&&(<Chatbox id={ticketid} user_name={user.user_name} jwttoken={user.jwttoken}  power={user.power} />)}
                </div>
              
            </section>
            <section id="fullimg"> {Fullimg&&(
                <img  className="viewticketimgfull" src={`data:image/jpeg;base64,${Data.Screenshots}`} onClick={fullscreenimg}></img>
            )}</section>
             
             <button style={{width:"100px",margin:'0px'}} onClick={()=>{
                navigate('/')
             }}>Go Home</button>
              <button style={{width:"100px",margin:'0px'}} onClick={()=>{
                navigate(-1)
             }}>Go Back</button>
            </section>)}
            
            </section>
         
        </section>
    )
}