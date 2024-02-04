import React from "react";

export default function SelectOPtionAddAdmin(props){
    return(
        <select value={props.value} onChange={props.onchange} style={{margin:'1%',width:'60%',height:'30px'}} required>
         <option>Select</option>
         <option>Admin</option>
         <option>SupportTeam</option>
    </select>
    )
}