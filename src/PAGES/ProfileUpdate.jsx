import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SideBar from "../components/Sidebar";
import EditProfile from "./EditebleSidebar";
import LogNavbar from "../components/navbar";
import { checkalreadyclint } from "../js/tools";
import { useNavigate } from "react-router-dom";






export default function ProfileUpdate(){
        const navigate=useNavigate()
        const [img,setimg]=useState(null);
        const [previewimg,setpreviewimg]=useState("uploadimg.png")
        
        const userString = localStorage.getItem("loguser");
        const user = userString ? JSON.parse(userString) : null;

        const [Accesspage,setAccesspage]=useState(false)
        const [loading,setloading]=useState(false)
   
        useEffect(()=>{
       
            
   
         if(user){
            const thispage='User'
             checkalreadyclint(user,setAccesspage,navigate,thispage)
         }
         else{
             navigate('/Login')
         }
       
   },[])
       

        const handlechange=async(e)=>
        {
            const file=e.target.files[0]

            setimg(file)

            if(file){
                const urlimg=await URL.createObjectURL(file)
                setpreviewimg(urlimg);
                
            }
        }
     

        const submitpic=async()=>{
            if(img){
                try{
                
const formdata=new FormData();
                    formdata.append("img",img);
                    formdata.append("authuser",JSON.stringify(user))

            const uploadimg=    await fetch("/api/profilepic",{
                    method:"Post",
                   headers:{
                    'authorization':`Bearer ${user.jwttoken}`
                   },
                    body:formdata,
                })
                if(uploadimg.ok){
                    const data=await uploadimg.json()
                    localStorage.setItem('profile_img','')
                    localStorage.setItem('profile_img',data.image)
                    console.log(data.msg+data.image)
                    navigate('/NewTicket')
                   
                }

             } catch(e){
                console.error(e)
             }}
        }
        const skippage=()=>{
            navigate('/NewTicket');
        }

    return Accesspage&&(
    <section>
          <LogNavbar page={user.power}/>
        <section className="content" style={{color:"white",padding:"4%"}}>
           <section className="main">
        <section style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
      
        <img src="welcome.png" style={{width:"300px",margin:"2%"}}/>
            <h2>Hello User</h2>
            <h4 style={{marginTop:"2%"}}>please Upload Profile Picture</h4>
        
            <img src={previewimg} width={180} height={130} style={{margin:"4%"}} />
           
            <input type="file"  style={{width:"200px"}} onChange={handlechange} accept="image/*"></input>
            <button type="submit" style={{margin:"5%",width:"200PX",backgroundColor:"blue"}} onClick={submitpic}>Upload Image</button>
       <button style={{width:"100px" ,backgroundColor:'red'}} onClick={skippage}>Skip</button>
        </section>

        </section>
        <SideBar/>

    </section>
    </section>

     )
}