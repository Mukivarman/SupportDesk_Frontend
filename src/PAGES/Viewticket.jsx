import React, { useEffect, useState } from "react";
import LogNavbar from "../components/navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Chatbox from "../components/Chat";
import '../assets/css/viewtickets.css'
import { checkalreadyclint } from "../js/tools";
import Success,{Failed} from "../components/Responses";
import LoadingBar from "../components/Loadings";
import Loadingicon from "../components/loading";
import { fetch_Api } from "../js/tools";

export default function ViewTicket(){
    const theme=localStorage.getItem('theme')
   const [Data,setData]=useState(null);
   const {ticketid}=useParams()
   const [Fullimg,setFullimg]=useState(false)
   const [Statusoption,setStatusoption]=useState('Select')
   const navigate=useNavigate()
   const userString = localStorage.getItem("loguser");
   const [user,setuser] = useState( JSON.parse(userString))
   const [Responses,setResponses]=useState(0)
   const [msg,setmsg]=useState(null)
   const [Accesspage,setAccesspage]=useState(false)
   const [loading,setloading]=useState(false)
   const [Enablechat,setEnablechat]=useState(false)
   const [iconload,seticonload]=useState(false)



   /*Check The user To access The Page*/
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
            const getdata=await fetch_Api(`api/GetOneTicket/${ticketid}`,'Get',user.jwttoken)
  
            if(getdata.Res){
                setData(getdata.data);
                setStatusoption(getdata.data.Status)
                setloading(true)
           
            }else{
                setloading(true)
                setResponses(-1)
                setmsg("Ticket id is not valid")
              console.log(Data.msg)
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const updateticket=async(id)=>{
        seticonload(true)
        const data={
            status:Statusoption,
            ticketid:id
        }
     if(setStatusoption!=='Select'){
        
     const fetching=await fetch_Api('api/updateTicket','Post',user.jwttoken,JSON.stringify(data))
  
     if(fetching.Res){
        seticonload(false)
        setmsg("Update is SucessFull")
        setResponses(1)

      
     }else{
        seticonload(false)
        setmsg(Data.msg)
        setResponses(-1)
     }
    }
    }
    const taketicket=async(ticketid)=>{
      seticonload(true)
      const taked=await fetch_Api('api/taketickets','Post',user.jwttoken,JSON.stringify({Ticketid:ticketid}))
  
      if(taked.Res){
        seticonload(false)
        setmsg("Ticket Taked Succesfull")
        setResponses(1)
        console.log(taked.data)
      }else{
        seticonload(false)
        const a=taked.msg
        setmsg(a)
        setResponses(-1)
        console.log(Data.msg)
      }
    }

     
    const fullscreenimg=()=>{
        setFullimg(!Fullimg)

    }

        
    const handleresponse=(datas,nxt)=>{
        setResponses(datas)
        if(nxt==0){
           navigate('/')
        }
    if(nxt==1){
        window.location.reload()
    }
    
    }
    

const DivField=(props)=>( 
                <div style={{display:'flex'}}> 
                <h3 className="field">{props.field}</h3>
                <span className="fielddata">{props.data}</span>
</div>)


const Selectfield = (props) => (
    <select
      value={props.Statusoption}
      onChange={(e) => props.setStatusoption(e.target.value)}
      style={{ width: '150px', height: '30px', backgroundColor: 'black', color: 'white' }}
    >
      <option style={{ backgroundColor: 'black' }}>Select</option>
      <option style={{ backgroundColor: 'black' }}>OnHold</option>
      <option style={{ backgroundColor: 'black' }}>Pending</option>
      <option style={{ backgroundColor: 'black' }}>Solved</option>
    </select>
  );
  
    return Accesspage&&loading?(
        
        <section className={theme==='light'?'light':'dark'}>
       
             
              <section  className="content">
         {Data&&(
           <section className="viewticket">
              <h2 className="viewsubject"> Ticket Details</h2>

             <section className="view-ticket-details"> 
         
           <div className="viewticketfields">
         
                <DivField field='Ticket Id :' data={Data._id}/>
                <DivField field="Occured Date:" data={ new Date(Data.OccuredDate).toLocaleDateString()+"-"+new Date(Data.OccuredDate).toLocaleTimeString()}/>
                <DivField field="Subject:" data={Data.Subject}/>
                <DivField field="Message" />
                <p className="textarea">{Data.Message} </p>
           </div>
        

     <div className="view-ticket-image-section" >
                   <a href="#fullimg">
                            <img 
                                className="view-ticket-image"
                                src={`data:image/jpeg;base64,${Data.Screenshots}`}
                                onClick={fullscreenimg}>
                            </img>
                    </a> 

              <DivField
                         field="Assigned Person:"  
                         data= {Data.AssignedUser===null?
                                    (
                                        user.power==="SupportTeam"?(
                                <div style={{display:"block",marginLeft:"auto",marginRight:'auto'}}>
                                        {iconload?<Loadingicon/>:
                                        <button
                                        onClick={()=>(taketicket(Data._id,user))}>
                                        Take</button>
                                        }
                                 </div>)
                                        :('Waiting To Assign')
                                   
                                   )
                                   :(Data.AssignedUser.username)}/>
              <DivField  
                       field="Created At" 
                       data={new Date(Data.CreatedAt).toLocaleDateString()+' - '
                       +new Date(Data.CreatedAt).toLocaleTimeString()}/>
             
        
              <DivField
                        field="Status"
                        data={
                            user.power === 'SupportTeam' &&
                            Data.AssignedUser !== null &&
                            Data.AssignedUser.username === user.user_name ? (
                            <Selectfield Statusoption={Statusoption} setStatusoption={setStatusoption} />
                            ) : (
                            <h3 className="fielddata">{Data.Status}</h3>
                            )
                        }
                        />
                                    
                  
              {user.power==='Admin'&&
                 Data.AssignedUser===null&&<div style={{display:"block",marginLeft:"auto",marginRight:'auto'}}>
                 {iconload?<Loadingicon/>: <button style={{width:'100%'}}
                onClick={()=>(navigate(`/allsupportteam/${Data._id}`))}>
                Assign
                </button>}
                </div>}
              
              <br/>
              
               <div style={{display:'flex' ,margin:'5%'}}>
                 {user.power==='SupportTeam'&& 
                     (Data.AssignedUser)!==null&&
                     (Data.AssignedUser.username)===user.user_name&&
                     <div style={{display:"block",marginLeft:"auto",marginRight:'auto'}}>
                     {iconload?<Loadingicon/>:
                     <button style={{margin:'0px',width:'150px'}} 
                     onClick={()=>(updateticket(Data._id))}> 
                     Update</button>}
                     </div>} 

                </div>
                

                {(Data.AssignedUser)!==null&&Enablechat===false&&(<button onClick={()=>(setEnablechat(true))}>Chat</button>)}
                </div>
              
     </section>
                        
     <div>
                {Enablechat&&(<Chatbox id={ticketid} user_name={user.user_name} jwttoken={user.jwttoken}  power={user.power} />)}
                </div>
                <br/>
                <div>
                    {
                    Enablechat&&<button
                          style={{width:"200px",margin:'3px'}}
                          onClick={()=>(setEnablechat(false))}
                          >Close Chat</button>
                    }
                </div>

            <section id="fullimg"> {Fullimg&&(
                <img  className="viewticketimgfull" src={`data:image/jpeg;base64,${Data.Screenshots}`} onClick={fullscreenimg}></img> )}
            </section>
             
             <button style={{width:"100px",margin:'3px'}} onClick={()=>{
                navigate('/')
             }}>Go Home</button>
              <button style={{width:"100px",margin:'3px'}} onClick={()=>{
                navigate(-1)
             }}>Go Back</button>
         { Responses===1&&<Success data={msg}  exit={handleresponse}/>}
         {Responses===-1&&<Failed data={msg} exit={handleresponse}/>}
            </section>)}
            
            </section>
         
        </section>

    ):
   
        <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundColor: 'rgba(1, 255, 255, 0.286)',backdropFilter:'blur(5px)' }}        >
        <LoadingBar type='bars' color='black' />
        </div>
}
       