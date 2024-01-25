import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

 function LogNavbar(props){
    const navigate=useNavigate()

 const [withoutlogin,setwithoutlogin]=useState(
    [
        {link:'/',
         linkpage:'LandingPage'
        },
        {
            link:'/Login',
            linkpage:'LoginPage'
        },
        {
            link:'/UserRegister',
            linkpage:'Register New User'
        }

    ]
 )

 const [UserLogin,setUserLogin]=useState([
    {
        link:'/NewTicket',
        linkpage:'Create New Ticket'
    },  {
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },  {
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    },  {
        link:'/viewTickets',
        linkpage:'View All Tickets'
    },{
        link:'/profileupdate',
        linkpage:'Update Profile'
    }
])

const [AdminLogin,setAdminLogin]=useState([
    {
        link:'/AdminPage',
        linkpage:'Admin Home Page'
    },
    {
        link:'/admintable',
        linkpage:'View All Tickets'
    },
    {
        link:'/UserRegister',
        linkpage:'ADD Clints'
    },{
        link:'/ticketfilter/Pending',
        linkpage:'View Pending Tickets'
    },
    {
        link:'/ticketfilter/Solved',
        linkpage:'View Solved Tickets'
    },
    {
        link:'/ticketfilter/Unassigned',
        linkpage:'View UnAssigned Tickets'
    },
   
])

const [ClintLogin,setClintLogin]=useState([
    {
        link:'/supporttmhomepage',
        linkpage:'Home Page'
    },
    {
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },
    {
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    },
    {
        link:'/SupportTeam-AllTickets',
        linkpage:'View All Tickets'
    }
])



const logout=()=>{
        localStorage.setItem('loguser','')
        localStorage.getItem('profile_img','')
        navigate('/')

}



const List=(props)=>{
    return(
            <li key={props.i}><NavLink to={props.links}>{props.linkpage}</NavLink></li>
    )
}
    return(
    <section>
        <ul className="navbar">
            {props.page==='NotLogin'&&withoutlogin.map((NavLinks,i)=>(
 <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} />
            ))
               
            }
              {props.page==='User'&&UserLogin.map((NavLinks,i)=>(
 <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} />
            ))
            }
            {props.page==='Admin'&&AdminLogin.map((NavLinks,i)=>(
                <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} />
                           ))
            
               
            }
             {props.page==='SupportTeam'&&ClintLogin.map((NavLinks,i)=> (
              
                <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} />
                           ))
                           
            
               
            }
          {!(props.page==='NotLogin')&&<li onClick={logout} className="logout">Logout </li>}  
         
        
        </ul>
    </section>)
}
export default LogNavbar;