import { useState } from 'react'
import './App.css'
import './index.css'
import { Routes,Route } from 'react-router-dom'
import LogNavbar from './components/navbar'
import Header from './components/Headers'
import SideBar from './components/Sidebar'
import Register from './PAGES/Register'
import ProfileUpdate from './PAGES/ProfileUpdate'
import UserHomePage from './PAGES/HomePage'
import ShowAllTickets from './PAGES/TicketsPage'

import Login from './PAGES/Login'
import NewTicket from './PAGES/NewTicket'
import ViewTicket from './PAGES/Viewticket'
import LandingPage from './PAGES/LandingPage'
import Adminpage from './PAGES/Admin'
import SupportTeam_AllTickets from './PAGES/TekeTickets'
import AdminShowAllTickets from './PAGES/admintable'
import AllSupportTeamList from './components/SupportTeamList'
import TicketFilterpge from './components/Ticketfiters'
import SupportTeamHomePage from './PAGES/SupportHome'

function App() {


  return (
    <section>

    <Header/>
      <Routes>
      
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/UserRegister' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/profileupdate' element={<ProfileUpdate/>}/>
        <Route path='/NewTicket' element={<NewTicket/>}/>
        <Route path='/viewTickets' element={<ShowAllTickets/>}/>
        <Route path='/ViewTicketDetails/:ticketid' element={<ViewTicket/>}/>
        <Route path='/AdminPage' element={<Adminpage/>}/>
        
        <Route path='/SupportTeam-AllTickets' element={<SupportTeam_AllTickets/>}/>
        <Route path='/admintable'element={<AdminShowAllTickets/>}/>
        <Route path='/allsupportteam/:ticketid' element={<AllSupportTeamList/>}/>
        <Route path='/ticketfilter/:filter' element={<TicketFilterpge/>}/>
      
        <Route path='/supporttmhomepage' element={<SupportTeamHomePage/>}/>
      </Routes>
     
 
    
    
   
    </section>
  )
}

export default App
