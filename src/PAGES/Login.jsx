import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { checkspace } from "../js/tools";
import Input from "../components/Inputs";
import LogNavbar from "../components/navbar";
import '../assets/css/Login.css'




export default function Login(){

    const navigate=useNavigate();
    const [Accesspage,setAccesspage]=useState(false);
    const [msg,setmsg]=useState("");
    const theme=localStorage.getItem('theme')
    const [inputs,setinputs]=useState({
        log_detail:"",
        userPassword:"",
    });
    const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : null;
    useEffect(()=>{
            const checkalreadyclint=async()=>{
                const auth=await fetch('/api/Alreadylogin',{
                    method:'Get',
                    headers:{
                        'Content-Type':'Appliction/json',
                        'authorization':`Bearer ${user.jwttoken}`
                    }

                })
                if(auth.ok){
                    const {loginnewuser}=await auth.json()
                                   
                    console.log(loginnewuser)
                
                    if(loginnewuser.power==='Admin'){
                        navigate('/AdminPage')
                    }else if(loginnewuser.power==='SupportTeam'){
                        navigate('/supporttmhomepage')
                      
                    }else if(loginnewuser.power==='User'){
                        console.log(loginnewuser.pro_img)
                      if(loginnewuser.pro_img){

                        navigate("/profileupdate")
                      }else{
                        navigate('/NewTicket')
                      }
                    }
                  
    
                }else{
                    localStorage.setItem('loguser','')
                    localStorage.setItem('profile_img','')
            
                    navigate('/Login')
                    console.log(await auth.json())

                }
            } 

            if(user){
                checkalreadyclint()
            }
            else{
                setAccesspage(true)
            }

          
    },[])

   

   
    
    const handleinput=(e)=>{
        setinputs({...inputs,[e.target.name]:e.target.value })
    
    }
    
    const login=async(e)=>{
        e.preventDefault()

        if(inputs.log_detail!=""&&inputs.userPassword!=""){
            if(!checkspace(inputs.log_detail)&&!checkspace(inputs.userPassword)){
                setmsg("")
                try{
                    localStorage.setItem("loguser",null);
                          const req=  await fetch("/api/Login",{
                                method:'Post',
                                headers:{
                                    'Content-Type': 'application/json'
                                },
                                body:JSON.stringify(inputs),
                            });
                            
                            if(req.ok){
                             
                                const {loginnewuser}=await req.json()
                               
                                console.log(loginnewuser)
                                
                                localStorage.setItem("loguser",JSON.stringify(loginnewuser))
                                localStorage.setItem('profile_img',loginnewuser.image)
                                localStorage.setItem('dept',JSON.stringify({
                                    dept:loginnewuser.dept,
                                    empcode:loginnewuser.empcode
                                }))
                                if(loginnewuser.power==='Admin'){
                                    navigate('/AdminPage')
                                }else if(loginnewuser.power==='SupportTeam'){
                                    navigate('/supporttmhomepage')
                                }else{
                                    console.log(loginnewuser.pro_img)
                                  if(!loginnewuser.pro_img){
                                    navigate("/profileupdate")
                                  }else{
                                    navigate('/NewTicket')
                                  }
                                }
                              
                                
                            }
                            else{
                                const response=(await req.json())
                                setmsg(response.msg)
                                
                            }



            }catch(e){
console.error  (e)
            }
            
        }else{
                setmsg("Username/Email or password contain Space")
            }
        
    
        }else{
            setmsg("input details Are Empty")
        }
       
        
    }
    return Accesspage&&(    
        <section className={theme==='light'?'light':'dark'}>
           
            <LogNavbar page='NotLogin'/>
          
      <form onSubmit={login}  className="content"> 
          <fieldset className="main">
                 <h1 className="head-login">Login</h1>
            
            <Input type="text" 
                css="in1" 
                field="username or Email"
                name="log_detail" onchange={handleinput}
                value={inputs.log_detail} />

            <Input type="password" 
                css="in1" 
                field="Password" 
                name="userPassword" 
                onchange={handleinput} 
                value={inputs.userPassword}/>
          
            <p style={{margin:"1%",color:"red"}}>{msg}</p>
            
            <button type="submit">Login</button>
            
   
    
            <div className="signup">
                <p>Don't Have An Account?</p>
                <Link to="/UserRegister"><button>Signup</button></Link>
                 
            </div>


        </fieldset>
        </form>
        </section>)
         
   
}
