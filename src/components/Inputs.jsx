import React from "react";

function Input(props){
    return(
        <input 
        className={props.css} 
        type={props.type} 
        placeholder={props.field} 
        value={props.value} 
        required
        name={props.name}
        onChange={props.onchange} 
        maxLength={props.length}
           ></input>
    )
}
export default Input;