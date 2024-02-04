import React from "react";
import '../assets/css/Dialogbox.css'


export default function Success(props){

    return(
        <section>
            <section className="divboxcontainer" >
                <div className="Success">
                <div className="sucessimg"></div>
                <h3>Success</h3>
                <div className="msg">
                    <p>{props.data}</p>
                </div>
                <p className="ok" onClick={()=>(props.exit(0))}>OK</p>
                </div>
           
            </section>
            
        </section>
    )

}

function Failed(props){
    
    return(
        <section className="divboxcontainer">
            <div className="failed">
                <div className="failedimg"/>
                <h3>Request Failed</h3>
                <div className="msg">
                    <p>{props.data}</p>
                </div>
                <p className="ok" onClick={()=>(props.exit(0))}>Ok</p>
                </div> 

        </section>
    )
}

export {Failed}