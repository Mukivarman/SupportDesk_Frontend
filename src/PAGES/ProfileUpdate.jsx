import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import SideBar from "../components/Sidebar";
import LogNavbar from "../components/navbar";
import { checkalreadyclint } from "../js/tools";
import { useNavigate } from "react-router-dom";
import Input from "../components/Inputs";
import Loadingicon from "../components/loading";




export default function ProfileUpdate(){
        const navigate=useNavigate()
        const [img,setimg]=useState(null);
        const theme=localStorage.getItem('theme')
        const userString = localStorage.getItem("loguser");
        const user = userString ? JSON.parse(userString) : null;
       console.log(user.empcode+user.dept)
        const [inputs,setinputs]=useState({
            department:user.dept,
            EMPcode:user.empcode,
        })
        const [previewimg,setpreviewimg]=useState("uploadimg.png")
        
       
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

    const changeinput=(e)=>{
        setinputs({...inputs,[e.target.name]:e.target.value})
    }
       

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
            setloading(true)
            if(img&&inputs.EMPcode!==''&&inputs.department!==''){
                try{
                
const formdata=new FormData();
                    formdata.append("img",img);
                    formdata.append("authuser",JSON.stringify(user))
                    formdata.append('inputs',JSON.stringify(inputs))

            const uploadimg=    await fetch("https://supportdesk-hm1g.onrender.com/api/profilepic",{
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
                    localStorage.setItem('dept',JSON.stringify({
                        dept:data.dept,
                        empcode:data.empcode
                    }))
                    console.log(data)
                    setloading(false)
                    navigate('/NewTicket')
                   
                }else{
                    console.log("profile update failed")
                }

             } catch(e){
                console.error(e)
             }}else{
                console.log('input fields are empty')
             }
        }
        const skippage=()=>{
            navigate('/NewTicket');
        }



    return Accesspage&&(
    <section className={theme==='light'?'light':'dark'}>
        <section className="content">
           <section className="main">
        <section className="img-update-section">
      
        <img src="welcome.png"  className="img-in-update-section"/>
            <h2>Hello {user.user_name}</h2>
        <Input
            value={inputs.EMPcode}
            type='text' 
            name='EMPcode' 
            css='in1' 
            field='Employee Code' 
            onchange={changeinput}/>
        <Input 
        value={inputs.department}
            type='text' 
            name='department' 
            css='in1'
            field='Department'
            onchange={changeinput}/>
        <img src={previewimg} width={180} height={130} style={{margin:"1%"}} />
           
            <input type="file" onChange={handlechange} accept="image/*"></input>

           {loading?<div style={{display:'flex',justifyContent:"center",}}><Loadingicon/></div>: <button type="submit" 
                className="upload-img-btn"  
                   onClick={submitpic}>
                      Upload Profile</button>}
                       
            <button className="skip" onClick={skippage}>Skip</button>
        </section>

        </section>
        <SideBar/>

    </section>
    </section>

     )
}
