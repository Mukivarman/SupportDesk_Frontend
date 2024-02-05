import React, { useState } from "react";
import '../assets/css/SideBar.css'
import Details from "./SidebarDetails";
import Notification from "./Notification";


export default function SideBar(){

  const userString = localStorage.getItem("loguser");
  const user = userString ? JSON.parse(userString) : null;
  const profile_img=localStorage.getItem('profile_img')
  const dept=localStorage.getItem('dept')
  const department=dept?JSON.parse(dept):''


  const [notification,setnotification]=useState(false)
  const [deatail,setdetails]=useState(true)


  const handledeatails=()=>{
    setnotification(false)
    setdetails(true)

  }
  const handleNotification=()=>{
    setnotification(true)
    setdetails(false)

  }



  return(  
     <section className="sidebar">
      <section className="profile">
      <section className="proimg">
      <img src={`data:image/jpeg;base64,${profile_img}`} className="profileimg"></img>
    </section>
    <h2 className="username">{user.user_name}</h2>
    <p style={{margin:"3%",textTransform:'capitalize'}}> {department.dept} Department</p>
    <p>{department.empcode}</p>
   
    <div className="userdetail">
  
    {deatail&&
    <Details user={user}/>}
    {notification&&
    <Notification user={user}/>}

      <div className="sidebar-btn">
        <p  style={notification?{backgroundColor:'#04AA6D'}:{backgroundColor:' rgb(26, 121, 128)'}} onClick={handleNotification}>Notification</p>
        <p style={deatail?{backgroundColor:'#04AA6D'}:{backgroundColor:' rgb(26, 121, 128)'}}  onClick={handledeatails}>Details</p>
      </div>
    </div>
    </section>
     </section>)
}
