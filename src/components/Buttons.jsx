import React from "react"

export default function Buttons(props){

    const { linkto, text, setchart, navigate, chart } = props;


const handlelinks=(prams)=>{
    if(prams==='linktoallticket'){
      navigate('/SupportTeam-AllTickets')
  
    }else if(prams==='Alltickets'){
       navigate('/admintable')
    }

    else if(prams==='changechart'){
      setchart((!chart))
    }
    else{
      navigate(`/ticketfilter/${prams}`)
    }
   
  
  
  }
  
  
    return(<button style={{width:'200px',margin:'6%'}} onClick={()=>(handlelinks(linkto))}>{text}</button>)

}

