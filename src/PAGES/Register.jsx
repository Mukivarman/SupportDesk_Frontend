import React, { useEffect } from "react";
import { useState } from "react";
import { Link,json,useNavigate } from "react-router-dom";
import { checkpassword,checkspace } from "../js/tools";
import Input from "../components/Inputs";
import LogNavbar from "../components/navbar";
import { checkalreadyclint } from "../js/tools";
import SelectOPtionAddAdmin from "../components/SelectOptionAdmin";
import '../assets/css/Login.css'
import Loadingicon from "../components/loading";
import Success,{Failed} from "../components/Responses";
import { fetch_Api } from "../js/tools";

export default function Register(){
    const theme=localStorage.getItem('theme')
  const [Msg,setMsg]=useState("");
  const [option,setoption]=useState('select')
  const [pageaccess,setpageaccess]=useState(true)
  const navigate=useNavigate();
  const userString = localStorage.getItem("loguser");
  const user = userString ? JSON.parse(userString) : 'no user';
  const [Otpinput,setOtpInput]=useState(false)
  const [loading,setloading]=useState(false)
  const [response,setresponse]=useState(0)
  const [inputs,setinputs]=useState({
    username:"",
    email:"",
    password:"",
    repeatpassword:"",
    otpemail:'',
    otp:'',
    pto:''
  })
   
    const [registeruser,setregisteruser]=useState('user') 

            useEffect(()=>{
                if(user&&user.power==='Admin'){
                    setregisteruser(user.power)
                }

            },[])

  const handleinput=(e)=>{ 
    setinputs({...inputs,[e.target.name]:e.target.value }) 
  }

  const PostUser=async(inputs)=>{
    const jwt="";
        const Data=await fetch_Api('api/Register','Post',jwt,JSON.stringify(inputs))
    
            if(Data.Res){
              
                setMsg("Registered Successfully")
                setresponse(1)
                setloading(false)
            }else{
                console.log(Data.msg)
                setMsg(Data.msg.msg) 
                setresponse(-1)
                setloading(false)
            }
    
    }
                                    
    const AddNewUser=async(inputs)=>{
                
        const Data=await fetch_Api(`api/Add/${option}`,'Post',user.jwttoken,JSON.stringify(inputs))
    
            if(Data.Res){
             
                setMsg(Data.data.msg)
                setresponse(1)
                setloading(false)
            }else{
                setMsg(Data.msg.msg)
                setresponse(1)
                console.log(Data.msg)
                setloading(false)
            }
    
    }
   
 const createAcc=async(e)=>{
         setloading(true)
       console .log(inputs)
  //check empty
      if(inputs.username!==""&&inputs.email!==""&&inputs.password!==""&&inputs.repeatpassword!==""&&inputs.otpemail!==''&&inputs.otp!==''&&inputs.pto!==''){
              console.log("1==")
  //check contain space            
        if(!checkspace(inputs.username)&&!checkspace(inputs.email)&&!checkspace(inputs.password)&&!checkspace(inputs.repeatpassword)&&!checkspace(inputs.otp)){
              console.log("2==") 
  //check password length                
          if(inputs.password.length>=8&&inputs.repeatpassword.length>=8){
              console.log("3==")
  //check equal password
              if(inputs.password===inputs.repeatpassword){
                  console.log("4===")
  //check password contain uppr,lower,digits,symbol
                  if(checkpassword(inputs.password)){
                     
                     
                      try{
               if(registeruser==='user'){
                                                                
                            const register=   PostUser(inputs)     

                         }
             else if(registeruser==='Admin'&&option!=='select'){
               
                          const add= AddNewUser(inputs)
  

                   }
                   else{
                        setMsg('regis failed')
                                 
                          }

                      }catch(e){
                          console.log(e+"reg fail")
                      }

                  }else{
                     setMsg("Passwords must one  Uppercase,Lowercase,DIgits,Symbol")
                  }
 
             }else{
                 setMsg("Password Dous Not Match");
             }

          }else{
              setMsg("password Length must 8 characters")
          }
        }else{
              setMsg("Please Remove the Spaces")
          }
         
      }else{
          setMsg("Please Enter Valid Details")
      }
}

const SentOtp=async(e)=>{
   
   setMsg('')
    if(inputs.email!==''&&!checkspace(inputs.email)){
       setloading(true)
                    const jwt='';
            const Data=await fetch_Api('api/otpsent','Post',jwt,JSON.stringify({email:inputs.email}))

            if(Data.Res){
                const datas=Data.data
                setMsg('')
                setloading(false)
                setinputs({...inputs,
                    otpemail:datas.Email,
                    pto:datas.Otp})
            }else{
                console.log(Data.msg)
                setMsg("otp genration failed")
            }

         

    }else{
        setMsg('email need')
    }

}

  



useEffect(()=>{
if(inputs.otpemail!==''&&inputs.pto!==''){
    if(inputs.otpemail===inputs.email){
        setloading(false)
        setOtpInput(true)
       
        
    }
    else{
        setOtpInput(false)
        setinputs({...inputs,otp:'',pto:'',otpemail:''})
        
    }
}
},[inputs.email,inputs.otpemail,inputs.pto])



const handleresponse=(datas,nxt)=>{
    setresponse(datas)
    if(nxt==0){
        window.location.reload()
    }
   if(nxt==1){
    navigate('/Login')
   }
   
}
  
    return pageaccess&&(
        <section className={theme==='light'?'light':'dark'}>
        
      
      <section  className="content">
        <fieldset className="main">
          <h1 className="head-login">SignUp</h1>
         <Input 
            type="text" 
            css="in1" 
            field="Enter Username" 
            name="username" 
            onchange={handleinput} 
            value={inputs.username} />

      <Input 
            type="email" 
            css="in1"
            field="Enter email" 
            name="email" 
            onchange={handleinput} 
            value={inputs.email}/>

      <Input 
            type="Password" 
            css="in1" 
            field="Enter Password"
            name="password" 
            onchange={handleinput} 
            value={inputs.password}/>

      <Input 
            type="password" 
            css="in1" 
            field="Enter RepeatPassword" 
            name="repeatpassword" 
            onchange={handleinput} 
            value={inputs.repeatpassword}/>
       <div>
      {Otpinput==false&&<div>
        
         {loading?<div style={{display:"flex",justifyContent:'center'}}><Loadingicon/></div>
            : <button onClick={SentOtp} style={{width:'100px'}}>Sent otp</button>}
         </div>
         }
     
  {Otpinput&& <Input 
       type='text'
       css="in1" 
       field="Enter Otp"
       name="otp" 
       value={inputs.otp}
       onchange={handleinput}
        /> }
       </div>
       
     
      {registeruser=='Admin'&&(
         <SelectOPtionAddAdmin value={option} 
              onchange={(e)=>(setoption(e.target.value))}/>
      )}
       <p style={{margin:"1%",color:"red"}}>{Msg}</p>
         {loading?<div style={{display:"flex",justifyContent:'center'}}><Loadingicon/></div>
         : <button type="submit" onClick={createAcc}>Create Account</button>}
         
          {registeruser==='user'&&(
             <section className="signup">      
                <p>Already Have Account</p>
                <Link to="/Login"><button>Login</button></Link>
          </section>
          )}

      </fieldset>
      </section>
      { response===1&&<Success data={Msg}  exit={handleresponse}/>}
      {response===-1&&<Failed data={Msg} exit={handleresponse}/>}
  </section>
    )

}
