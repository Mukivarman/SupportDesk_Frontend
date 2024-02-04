import React from "react";
import { useNavigate } from "react-router-dom";
export default function LandingPage(){
    const navigate=useNavigate();
    const theme=localStorage.getItem('theme')

    const gotologin=()=>{
        navigate('/Login')


    }

    return(
        <section className={theme==='light'?'light':'dark'}>
        <section className="content">
            <section className="box">
                <section className="webdetails">
                    <div>
                    <p className="home-big-para">Welcome To Our Online HelpDesk</p>
                    <p  className='home-description'>Unified service management platform for the Digital Enterprise</p>
                    <button className="home-start-btn"  onClick={gotologin}>Get Start</button>
                    </div>
                </section>
                <section>
<img src="helpdesk.gif" style={{width:"500px",height:"450px"}}/>
                </section>
              
            </section>
   
        </section>
        </section>
    )
}