import React, { useState } from "react";

export default function EditProfile(){

const [Editfield,setEditfield]=useState({
    username:"UserName",
    about:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis itaque, in nam eos quia consequatur reprehenderit eum numquam saepe temporibus? Vero praesentium"
})

return(  
    <section className="sidebar">
     <section className="profile">
   <section className="proimg" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
   <img src="editwhite.png" width={"20"} height={"20"} ></img>
   </section>
  <input type="text" value={Editfield.username} className="username"></input>
   <textarea type="text" value={Editfield.about} style={{margin:"3%",width:"400px",height:"80px"}}></textarea>
   <button style={{width:"200px"}}>Update</button>
   </section>
    </section>)
}
