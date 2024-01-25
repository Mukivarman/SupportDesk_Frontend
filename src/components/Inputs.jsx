import React from "react";

function Input(props){
    return(
        <input type={props.type} className={props.css}  placeholder={props.field}  value={props.value} onChange={props.onchange} required  name={props.name} ></input>
    )
}
export default Input;