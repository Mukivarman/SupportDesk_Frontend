import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { fetch_Api } from "../js/tools";
import Loadingicon from "./loading";

export default function Chatbox(props){
const inputfocus=useRef(null)
const [Chatdata,setChatdata]=useState([])
const userimg=localStorage.getItem('profile_img')
const [loading,setloading]=useState(false)


const fetcingchat=async()=>{
    
    const getchat=await fetch_Api(`api/getchats/${props.id}`,'Get',props.jwttoken)
   
    if(getchat.Res){
        const chats=getchat.data
        chats.chats.reverse()
        setChatdata(chats.chats)
        

    }else{
        console.log(getchat.msg)

    }
}
useEffect(()=>{

      
    if(Chatdata.length===0){
        fetcingchat()
    }
   inputfocus.current.focus()

},[])

useEffect(()=>{
    
const chatintervel= setInterval(updates,5000)

return()=>(
   clearInterval(chatintervel)
)

},[Chatdata])


const updates=async()=>{
  
        const jwt='';
        const getupdatechat=await fetch_Api(`api/chatlive/${props.id}/${Chatdata.length}`,'Get',jwt)
      
        if(getupdatechat.Res){
            fetcingchat()

        }else{
          
          console.log('no changes')
        }
    
    
}


const [inputs,setinputs]=useState('')

const Assistchat=(props)=>(
    <div  className="assistchat">
          <div className="user-img-chat">
           {props.datas.power==='User'?'':<div className="userimge" />}
            <p>{props.datas.user}</p>
         </div>
       
        <div className="tm-msg">
                       <p>{props.datas.msg}</p>
                       <p className="time">{ new Date(props.datas.time).toLocaleDateString()+"-"+new Date(props.datas.time).toLocaleTimeString()}</p>
          </div>
    </div>
)


const Userchat = (props) => (
    <div  className="userchat">
      <div className="tm-msg">
        <p>{props.datas.msg}</p>
        <p className="time" style={{}}>{ new Date(props.datas.time).toLocaleDateString()+'-'+new Date(props.datas.time).toLocaleTimeString()}</p>
      </div>
      <div className="user-img-chat">
      {props.datas.power==='User'?<img  className="chatuserimg" src={`data:image/jpeg;base64,${userimg}`}/>:<div className="userimge" />}
      <p>{props.datas.user}</p>
      </div>
     
    </div>
  );
  

const handleinputchat=async()=>{
    setloading(true)
    if(inputs!==""){
        const res=await fetch('https://supportdesk-hm1g.onrender.com/api/postchat',{
            method:'Post',
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${props.jwttoken}` 
                },
                body:JSON.stringify({chat:inputs,
                                    ticketid:props.id,
                                    user_name:props.power==='Admin'?'Admin':props.user_name})
        })
        if(res.ok){
            setinputs('')
          setloading(false)
            fetcingchat()


        }
        else{
            console.log(await res.json())
            setloading(false)
        }
    }else{
        console.log('input empty')
    }
}

const handleSubmit = (e) => {
    e.preventDefault();
   
  };
    return(
      
        <section className="chatbox">
         
         <div className="chats" >
     {Chatdata.length>=0&&Chatdata.map((data,i)=>
            {console.log(data.msg)
                return(
                data.user===props.user_name?
                    (<Userchat key={i} datas={data}/>):(<Assistchat key={i} datas={data}/>)
                    
            )})
            
            }

             
  
            </div>
         <div className="inputsdiv">
            <form onSubmit={handleSubmit}>
            <input type="text"
                value={inputs} 
                name="input"
                onChange={(e)=>(setinputs(e.target.value))}
                ref={inputfocus}
            ></input>
           {loading?<div style={{display:'flex',justifyContent:'center'}}><Loadingicon/></div>: 
            <button 
               style={{width:'10%'}}
               onClick={handleinputchat}
               type="submit"
               name="input"
               >Sent</button>}
               </form>

            </div>
        </section>
       
    )
}