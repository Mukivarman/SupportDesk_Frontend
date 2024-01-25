import React from "react";

export default function SideBar(){

  const userString = localStorage.getItem("loguser");
  const user = userString ? JSON.parse(userString) : null;
  const profile_img=localStorage.getItem('profile_img')
console.log(profile_img)



  return(  
     <section className="sidebar">
      <section className="profile">
    <section className="proimg">
    <img src={`data:image/jpeg;base64,${profile_img}`} className="profileimg"></img>
     
      
    </section>
    <h2 className="username">{user.user_name}<img src="editwhite.png" width={"20"}></img></h2>
    <p style={{margin:"3%"}}> </p>
    <div className="userdetail">
      
    </div>
    </section>
     </section>)
}
