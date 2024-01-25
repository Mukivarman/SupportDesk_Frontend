import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { checkspace } from "../js/tools";
import Input from "../components/Inputs";
import LogNavbar from "../components/navbar";




export default function Login(){

    const [Accesspage,setAccesspage]=useState(false)
    const navigate=useNavigate()
   
   
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
                    localStorage.getItem('profile_img','')
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

   

    const [msg,setmsg]=useState("");

    const [inputs,setinputs]=useState({
        log_detail:"",
        userPassword:"",
    })

    const [checkbox,setcheckbox]=useState(false);
    
    const handleinput=(e)=>{
        setinputs({...inputs,[e.target.name]:e.target.value })
    
    }
    
    const changecheckbox=()=>{
        setcheckbox(!checkbox);
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
                                console.log(await req.json())

                                console.log("error")
                            }



            }catch(e){
console.log(e)
            }
            
        }else{
                setmsg("Username/Email or password contain Space")
            }
        
    
        }else{
            setmsg("input details Are Empty")
        }
       
        
    }
    return Accesspage&&(    
        <section>
           
            <LogNavbar page='NotLogin'/>
            <form onSubmit={login}  className="content"> 
        <fieldset className="main">
            
            <h1 style={{margin:"30px",padding:"2%",color:"aqua"}}>Login</h1>
            <Input type="text" css="in1" field="username or Email" name="log_detail" onchange={handleinput} value={inputs.log_detail} />
            <Input type="password" css="in1" field="Password" name="userPassword" onchange={handleinput} value={inputs.userPassword}/>
            <p className="Remember">
            <input type="checkbox"  checked={checkbox} onChange={changecheckbox}/> Remember me</p>
            <p style={{margin:"1%",color:"red"}}>{msg}</p>
            <button>Login</button>
            
   
          
            <p>Forgot password</p>
            <div className="signup">
                <p>Don't Have An Account?</p>
                <Link to="/UserRegister"><button>Signup</button></Link>
                 
            </div>


        </fieldset>
        </form>
        </section>)
         
   
}