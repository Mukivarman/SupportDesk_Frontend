import React, { useEffect, useState } from "react";
 import Darkicon from '../assets/images/icons/dark.png'
 import Sunicon from '../assets/images/icons/sun.png'

export default function ChangeTheme(){

    const [Theme,setTheme]=useState(localStorage.getItem('theme')||'dark')

    console.log(Theme)
    useEffect(()=>{
        localStorage.setItem('theme','')
        localStorage.setItem('theme',Theme)
    },[Theme])


const handleclick=()=>{
    Theme==='dark'?setTheme('light'):setTheme('dark')
    window.location.reload()
   
    console.log(Theme+"click")
}

const Themediv=(data)=>(
        <div onClick={handleclick}><img src={data.src} className="themebtn"  alt={data.theme} /></div>
)
    



    return(
        <section className="Themebox">
            {Theme==='dark'?
            <Themediv src={Sunicon}  theme={Theme} />
            :
            <Themediv src={Darkicon}  theme={Theme} />
            }
        
       </section>
    )
}