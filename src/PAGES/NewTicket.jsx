import React, { useEffect, useState } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import {json, useNavigate } from "react-router-dom";
import { checkalreadyclint } from "../js/tools";


export default function NewTicket(){

      const userString = localStorage.getItem("loguser");
        const user = userString ? JSON.parse(userString) : null;
        console.log(user)
        const navigate=useNavigate();
        const [Accesspage,setAccesspage]=useState(false)
        const [loading,setloading]=useState(false)
   
        useEffect(()=>{
         if(user){
            const thispage='User';
             checkalreadyclint(user,setAccesspage,navigate,thispage)
         }
         else{
             navigate('/Login')
         }
   },[])

      

    const [Inputs,setInputs]=useState({
        date:"",
        time:'',
        subject:"",
        message:"",
        img:null,
    
    })
    const [Msg,setMsg]=useState("")

   const handleinput=(e)=>{
    setInputs({...Inputs,[e.target.name]:e.target.value})

   }
  

   const handlesubmit=async(e)=>{
    e.preventDefault()
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

      const senddata=  await fetch ("/api/NewTicket",{
            method:"Post",
            headers:{
                'authorization':`Bearer ${user.jwttoken}`
               },
            body:formdata,
        })
        if(senddata.ok){
          const  ID=await senddata.json()

            navigate(`/ViewTicketDetails/${ID.ticketID}`)
        }else{
            console.log("error")
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
   
    return Accesspage&&(

   <section>
  <LogNavbar page={user.power}/>
   <section className="content"> 
  
   
        <section className="newticket"> 
           <h2 style={{textAlign:"center",margin:"5%", fontFamily:"serif"}}>Submit New Ticket</h2>
        <form className="ticket" onSubmit={handlesubmit}>
                <label>Problem Occured Date:</label><input type="date" name="date" value={Inputs.date} onChange={handleinput} required={true}></input>
                <label>Problem Occured Time:</label><input type="time" name="time" value={Inputs.time} onChange={handleinput} required={true} ></input>
                <label>subject :</label><input type="text" name="subject" value={Inputs.subject} onChange={handleinput} required={true}></input>
                <label>Message :</label><textarea name="message" value={Inputs.message} onChange={handleinput} required={true}></textarea>
               <label>Proof Image :</label><input type="file" name="img"  required={true} onChange={handleimg}  accept="image/*"></input>
            <br/>
            <p style={{color:"red"}}>{Msg}</p>
            <button type="submit" style={{width:"200px",height:"30px",margin:"auto"}}>submit</button>
            
        </form>
           </section>
        <SideBar/>
    </section>
    </section>)
}