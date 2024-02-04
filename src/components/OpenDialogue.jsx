import React from "react";
import '../assets/css/Dialogbox.css'

export default function DialogBox(props){

    return(
        <section className="divboxcontainer">
            
   <section className="dialogbox">
        <h3>{props.heading}</h3>
        <h4>{props.text}</h4>
        <div  className="confirmdiv"> <p onClick={()=>(props.exit(false))}>Cancel</p>
        <p style={{backgroundColor:props.color}} 
        onClick={()=>{props.do(true)}}>Confirm</p></div>
       

        </section>
        </section>
     
    )
}