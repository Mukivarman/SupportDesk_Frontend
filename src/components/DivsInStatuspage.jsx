import React from "react";


export default function Divs(props){
    return(<div style={{backgroundColor:props.bg}}>
        <h4>{props.text}</h4>
        <h4>{props.data}</h4>
      </div>)
}

