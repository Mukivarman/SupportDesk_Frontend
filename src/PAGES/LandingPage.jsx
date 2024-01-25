import React from "react";
import { useNavigate } from "react-router-dom";
export default function LandingPage(){
    const navigate=useNavigate();

    const gotologin=()=>{
        navigate('/Login')


    }

    return(
        <section className="content">
            <section className="box">
                <section className="webdetails">
                    <div>
                    <p style={{fontSize:'40px',color:'white',fontWeight:'bolder'}}>Welcome To Our Online HelpDesk</p>
                    <p style={{fontSize:'20px',color:'white'}}>Unified service management platform for the Digital Enterprise</p>
                    <button style={{width:"300px",margin:'3%'}} onClick={gotologin}>Get Start</button>
                    </div>
                </section>
                <section>
<img src="helpdesk.gif" style={{width:"500px",height:"450px"}}/>
                </section>
              
            </section>
   
        </section>
    )
}