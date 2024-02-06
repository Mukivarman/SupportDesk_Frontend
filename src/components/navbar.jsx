import React, { useEffect, useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

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
        {link:'/',
         linkpage:'Home'
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
        path:'../src/assets/images/icons/newticket.png',
        link:'/NewTicket',
        linkpage:'Create New Ticket'
    },  {
        path:'../src/assets/images/icons/pending.png',
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },  {
        path:'../src/assets/images/icons/solved.png',
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    }, 
    {
        path:'../src/assets/images/icons/waiting.png',
        link:'/ticketfilter/waiting',
        linkpage:'Waiting Tickets'

    },
    {
        path:'../src/assets/images/icons/onhold.png',
        link:'/ticketfilter/OnHold',
        linkpage:'OnHold Tickets'
    } ,
    {
        path:'../src/assets/images/icons/all.png',
        link:'/viewTickets',
        linkpage:'View All Tickets'
    },{
        path:'../src/assets/images/icons/resume.png',
        link:'/profileupdate',
        linkpage:'Update Profile'
    },

])

const [AdminLogin,setAdminLogin]=useState([
    {
        path:'../src/assets/images/icons/pie-chart.png',
        link:'/AdminPage',
        linkpage:'Admin Home Page'
    },
    
    {
        path:'../src/assets/images/icons/new.png',
        link:'/ticketfilter/Unassigned',
        linkpage:'View UnAssigned Tickets'
    },
    {
        path:'../src/assets/images/icons/all.png',
        link:'/admintable',
        linkpage:'View All Tickets'
    },{
        path:'../src/assets/images/icons/pending.png',
        link:'/ticketfilter/Pending',
        linkpage:'View Pending Tickets'
    },
    {
        path:'../src/assets/images/icons/solved.png',
        link:'/ticketfilter/Solved',
        linkpage:'View Solved Tickets'
    },
    {
        path:'../src/assets/images/icons/waiting.png',
        link:'/ticketfilter/waiting',
        linkpage:'View Waiting Tickets'
    },
    {
        path:'../src/assets/images/icons/onhold.png',
        link:'/ticketfilter/OnHold',
        linkpage:'View On Hold Tickets',
    },
    {
        path:'../src/assets/images/icons/add-user.png',
        link:'/UserRegister',
        linkpage:'ADD Clints'
    },
    {
        path:'../src/assets/images/icons/all.png',
        link:'/AllUsers',
        linkpage:'All Users '
    },
  
   
])

const [ClintLogin,setClintLogin]=useState([
    {
        path:'../src/assets/images/icons/pie-chart.png',
        link:'/supporttmhomepage',
        linkpage:'Home Page'
    },
    {
        path:'../src/assets/images/icons/pending.png',
        link:'/ticketfilter/Pending',
        linkpage:'Pending Tickets'
    },
    {
        path:'../src/assets/images/icons/waiting.png',
        link:'/ticketfilter/waiting',
        linkpage:'View  Waiting Tickets'
    },
    {
        path:'../src/assets/images/icons/onhold.png',
        link:'/ticketfilter/OnHold',
        linkpage:'View Holding Tickets'
    },
    {
        path:'../src/assets/images/icons/solved.png',
        link:'/ticketfilter/Solved',
        linkpage:'Solved Tickets'
    },
 
    {
        path:'../src/assets/images/icons/all.png',
        link:'/ticketfilter/Total',
        linkpage:'View Assigned Tickets'
    },
    {
        path:'../src/assets/images/icons/assign.png',
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
    <section className={theme==='light'?'light':'dark'}>
        <ul className="navbar">
            {!user&&withoutlogin.map((NavLinks,i)=>(
 <List key={i+1} links={NavLinks.link} linkpage={NavLinks.linkpage}  />
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
    </section>)
}
export default LogNavbar;