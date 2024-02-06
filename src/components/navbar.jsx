import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import Loginicon from '../assets/images/icons/logins.png'
import SigninIcon from '../assets/images/icons/signup.png'
import Landing from '../assets/images/icons/landing.png'
import Newtick from '../assets/images/icons/newticket.png'
import Pending from '../assets/images/icons/pending.png'
import Solved from '../assets/images/icons/solved.png'
import Waiting from '../assets/images/icons/waiting.png'
import Onhold from '../assets/images/icons/onhold.png'
import All from '../assets/images/icons/all.png'
import Update from '../assets/images/icons/resume.png'

import Admins from '../assets/images/icons/pie-chart.png'
import UnAssigned from '../assets/images/icons/new.png'
import Take from '../assets/images/icons/assign.png'


 function LogNavbar(props){
    const navigate=useNavigate()
    const userString = localStorage.getItem("loguser");
    const [user, setUser] = useState(userString!==''?JSON.parse(userString):null);
    const theme=localStorage.getItem('theme')

    
    console.log(user)


    useEffect(()=>{
    setUser(userString!==''?JSON.parse(userString):'')
    },[userString])

 const [withoutlogin,setwithoutlogin]=useState(
    [
        {
         path:Landing,
         link:'/',
         linkpage:'Home'
        },
        {
            path:Loginicon,
            link:'/Login',
            linkpage:'LoginPage'
        },
        {
            path:SigninIcon,
            link:'/UserRegister',
            linkpage:'Register New User'
        }

    ]
 )

 const [UserLogin,setUserLogin]=useState([
    {
        path:Newtick,
        link:'/NewTicket',
        linkpage:'Create New Ticket'
    },  {
        path:Pending,
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },  {
        path:Solved,
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    }, 
    {
        path:Waiting,
        link:'/ticketfilter/waiting',
        linkpage:'Waiting Tickets'

    },
    {
        path:Onhold,
        link:'/ticketfilter/OnHold',
        linkpage:'OnHold Tickets'
    } ,
    {
        path:All,
        link:'/viewTickets',
        linkpage:'View All Tickets'
    },{
        path:Update,
        link:'/profileupdate',
        linkpage:'Update Profile'
    },

])

const [AdminLogin,setAdminLogin]=useState([
    {
        path:Admins,
        link:'/AdminPage',
        linkpage:'Admin Home Page'
    },
    
    {
        path:UnAssigned,
        link:'/ticketfilter/Unassigned',
        linkpage:'View UnAssigned Tickets'
    },
    {
        path:All,
        link:'/admintable',
        linkpage:'View All Tickets'
    },{
        path:Pending,
        link:'/ticketfilter/Pending',
        linkpage:'View Pending Tickets'
    },
    {
        path:Solved,
        link:'/ticketfilter/Solved',
        linkpage:'View Solved Tickets'
    },
    {
        path:Waiting,
        link:'/ticketfilter/waiting',
        linkpage:'View Waiting Tickets'
    },
    {
        path:Onhold,
        link:'/ticketfilter/OnHold',
        linkpage:'View On Hold Tickets',
    },
    {
        path:SigninIcon,
        link:'/UserRegister',
        linkpage:'ADD Clints'
    },
    {
        path:All,
        link:'/AllUsers',
        linkpage:'All Users '
    },
  
   
])

const [ClintLogin,setClintLogin]=useState([
    {
        path:Admins,
        link:'/supporttmhomepage',
        linkpage:'Home Page'
    },
    {
        path:Pending,
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },
    {
        path:Waiting,
        link:'/ticketfilter/waiting',
        linkpage:'View  Waiting Tickets'
    },
    {
        path:Onhold,
        link:'/ticketfilter/OnHold',
        linkpage:'View Holding Tickets'
    },
    {
        path:Solved,
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    },
 
    {
        path:All,
        link:'/ticketfilter/Total',
        linkpage:'View Assigned Tickets'
    },
    {
        path:Take,
        link:'/SupportTeam-AllTickets',
        linkpage:'Take New Ticket'
    },
])



const logout=()=>{
        localStorage.setItem('loguser','')
        localStorage.setItem('profile_img','')
        localStorage.setItem('dept','')
        navigate('/')

}



const List=(props)=>{
    return(
            <li key={props.i}><NavLink to={props.links}><img src={props.path} className="nav-icon" />  {props.linkpage}</NavLink></li>
    )
}


    return(
    <div className={theme==='light'?'light':'dark'}>
        <ul className="navbar">
            {!user&&withoutlogin.map((NavLinks,i)=>(
 <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} path={NavLinks.path}  />
            ))
               
            }
              {user&&user.power==='User'&&UserLogin.map((NavLinks,i)=>(
 <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage}  path={NavLinks.path}/>
            ))
            }
            {user&&user.power=='Admin'&&AdminLogin.map((NavLinks,i)=>(
                <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage}  path={NavLinks.path}/>
                           ))
            
               
            }
             {user&&user.power==='SupportTeam'&&ClintLogin.map((NavLinks,i)=> (
              
                <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage} path={NavLinks.path} />
                           ))
                           
            
               
            }
    
          {(user)&&<li onClick={logout} className="logout" ><img src="../src/assets/images/icons/logout.png"  width={22}/>Logout </li>}  
         
        
        </ul>
    </div>)
}
export default LogNavbar;