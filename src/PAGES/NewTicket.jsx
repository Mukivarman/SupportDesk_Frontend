import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";
import Input from "../components/Inputs";
import '../assets/css/User.css'
import LoadingBar from "../components/Loadings";
import Success,{Failed} from "../components/Responses";


export default function NewTicket(){

      const userString = localStorage.getItem("loguser");
        const user = userString ? JSON.parse(userString) : null;
        console.log(user)
        const navigate=useNavigate();
        const [Accesspage,setAccesspage]=useState(false)
        const [Msg,setMsg]=useState("")
        const theme=localStorage.getItem('theme')
        const [loading,setloading]=useState(false)
        const [response,setresponse]=useState(0)
        const [ticketid,setticketid]=useState(null)
        const [Inputs,setInputs]=useState({
            date:"",
            time:'',
            subject:"",
            message:"",
            img:null,
        
        })
   
        
 useEffect(()=>{
         if(user){
            const thispage='User';
             checkalreadyclint(user,setAccesspage,navigate,thispage)
         }
         else{
             navigate('/Login')
         }
   },[])

      


   const handleinput=(e)=>{
    setInputs({...Inputs,[e.target.name]:e.target.value})

   }
  

   const handlesubmit=async(e)=>{
    e.preventDefault()
    setloading(true)
    if(Inputs.date!==""&&Inputs.subject!==""&&Inputs.message!==""&&Inputs.img!==null){
     try{
        const ticket={
            date:Inputs.date,
            time:Inputs.time,
            subject:Inputs.subject,
            message:Inputs.message,
        }
    
        const formdata=new FormData();
            formdata.append("img",Inputs.img);
            formdata.append('authuser',JSON.stringify(user));
            formdata.append('ticketdetails',JSON.stringify(ticket));

      const senddata=  await fetch ("https://supportdesk-hm1g.onrender.com/api/NewTicket",{
            method:"Post",
            headers:{
                'authorization':`Bearer ${user.jwttoken}`
               },
            body:formdata,
        })
        if(senddata.ok){
          const  ID=await senddata.json()
          setticketid(ID.ticketID)
          console.log(ID.ticketID)
            setMsg("Ticket Is Successfully Submitted")
            setresponse(1)
        
            
           
        }else{
            const res=await senddata.json()
            setMsg(res.msg)
            setresponse(-1)
        }
    }catch(e){
        console.error(e)
    }

    }
    else{
        setMsg("Input fields Are Empty");
        
    }
        }
        const handleimg=(e)=>{
            const file=e.target.files[0];
            setInputs({...Inputs,[e.target.name]:file})

        }

        const handleresponse=(datas,nxt)=>{
            setresponse(datas)
            if(nxt==0){
               window.location.reload()
            }
            if(nxt==1){
                console.log(ticketid)
                if(ticketid){
                navigate(`/ViewTicketDetails/${ticketid}`)
            }
        
        }
        
        }
   
const Label=(props)=>{
         return(<label>{props.text}</label>)
}


return Accesspage&& (

   <div  className={theme==='light'?'light':'dark'}>

   <section className="content"> 
   {loading&& 
     <div className="loadingbar" style={theme === 'light' ? { backgroundColor: 'white' } : { backgroundcolor: "#201f32df" }}        >
         <LoadingBar type='bars' color='black' />
      </div>}
    <section className="newticket"> 
           <h2 className="new-ticket-head">
               Submit New Ticket
                   </h2>
    <form className="ticket" onSubmit={handlesubmit}>
        <Label text='Problem Occured Date:'/>
            <Input  
                type="date" 
                name="date" 
                value={Inputs.date} 
                onchange={handleinput}
                length="20" />

        <Label text='Problem Occured Time :'/>
            <Input
                type="time"
                name="time" 
                value={Inputs.time}
                onchange={handleinput} />

        <Label text='subject :'/>
            <Input  
                type="text" 
                name="subject" 
                value={Inputs.subject}
                onchange={handleinput} 
                length='30'
                
                />

        <Label text='Message :'/>
            <textarea 
                name="message" 
                value={Inputs.message} 
                onChange={handleinput} 
                required={true}
                maxLength={1000}/>
                

        <Label text='Proof Image :'/>
      
           <Input
                type="file"
                name="img" 
                required={true}
                onchange={handleimg}  
                accept="image/*"/>
          
            <p style={{color:"red"}}>{Msg}</p>

            <button 
               className="submit-newticket"
                type="submit" 
                >submit</button>
            
        </form>
     </section>
     <SideBar/>
     { response===1&&<Success data={Msg}  exit={handleresponse}/>}
      {response===-1&&<Failed data={Msg} exit={handleresponse}/>}
    </section>
    </div>)
}