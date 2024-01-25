import React, { useEffect } from "react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { checkpassword,checkspace } from "../js/tools";
import Input from "../components/Inputs";
import LogNavbar from "../components/navbar";
import { checkalreadyclint } from "../js/tools";



export default function Register(){
  const [Msg,setMsg]=useState("");
  const [option,setoption]=useState('select')
  const [pageaccess,setpageaccess]=useState(true)
  const navigate=useNavigate();

  const userString = localStorage.getItem("loguser");
    const user = userString ? JSON.parse(userString) : 'no user';
    console.log(user)

    const [registeruser,setregisteruser]=useState('user') 

            useEffect(()=>{
                if(user.power==='Admin'){
                    setregisteruser(user.power)
                }

            },[])


 
 

  const [inputs,setinputs]=useState({
    username:"",
    email:"",
    password:"",
    repeatpassword:"",
  })
  
  const handleinput=(e)=>{ 
    setinputs({...inputs,[e.target.name]:e.target.value }) 
  }


 const createAcc=async(e)=>{
          e.preventDefault()
       console .log(inputs)
  //check empty
      if(inputs.username!==""&&inputs.email!==""&&inputs.password!==""&&inputs.repeatpassword!==""){
              console.log("1==")
  //check contain space            
        if(!checkspace(inputs.username)&&!checkspace(inputs.email)&&!checkspace(inputs.password)&&!checkspace(inputs.repeatpassword)){
              console.log("2==") 
  //check password length                
          if(inputs.password.length>=8&&inputs.repeatpassword.length>=8){
              console.log("3==")
  //check equal password
              if(inputs.password===inputs.repeatpassword){
                  console.log("4===")
  //check password contain uppr,lower,digits,symbol
                  if(checkpassword(inputs.password)){
                     console.log("password created")
                      setMsg("")
                      try{
                        if(registeruser==='user'){
                                const req=  await fetch('/api/Register',{
                                      method:'Post',
                                      headers:{
                                          'Content-Type': 'application/json'
                                      },
                                      body:JSON.stringify(inputs),
                                  });

                                  if(req.ok){

                                      navigate("/Login")
                                  }
                                  else{
                                      console.log("error")
                                  }
                                }
                                else if(registeruser==='Admin'&&option!=='select'){
                                    console.log(option)
                                    const req=  await fetch(`/api/Add/${option}`,{
                                        method:'Post',
                                        headers:{
                                            'Content-Type': 'application/json',
                                            'authorization':`Bearer ${user.jwttoken}`
                                        },
                                        body:JSON.stringify(inputs),
                                    });
  
                                    if(req.ok){
                                        
                                        console.log('added')
                                    }
                                    else{
                                        const msgs=await req.json()
                                        console.log(msgs)
                                        console.log("error")
                                    }

                                }
                                else{
                                    console.log('regis failed')
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



  
    return pageaccess&&(
        <section>
            {user&&user!=='no user'&& <LogNavbar page='Admin'/>}
           {user==='no user'&&<LogNavbar page='NotLogin'/>} 
        
      
      <form onSubmit={createAcc}  className="content">
      <fieldset className="main">
      <h1 style={{margin:"30px",padding:"2%"}}>SignUp</h1>
      <Input type="text" css="in1" field="Enter Username" name="username" onchange={handleinput} value={inputs.username} />
      <Input type="email" css="in1" field="Enter email" name="email" onchange={handleinput} value={inputs.email}/>
      <Input type="Password" css="in1" field="Enter Password" name="password" onchange={handleinput} value={inputs.password}/>
      <Input type="password" css="in1" field="Enter RepeatPassword" name="repeatpassword" onchange={handleinput} value={inputs.repeatpassword}/>
      {registeruser=='Admin'&&(
        <select value={option} onChange={(e)=>(setoption(e.target.value))} style={{margin:'1%',width:'60%',height:'30px'}} required>
            <option>Select</option>
            <option>Admin</option>
            <option>SupportTeam</option>
        </select>
      )}
      <p style={{margin:"1%",color:"red"}}>{Msg}</p>
          <button>Create Account</button>
         
          {registeruser==='user'&&(
             <section className="signup">      
                <p>Already Have Account</p>
                <Link to="/Login"><button>Login</button></Link>
          </section>
          )}

      </fieldset>
      </form>
 
  </section>
    )

}