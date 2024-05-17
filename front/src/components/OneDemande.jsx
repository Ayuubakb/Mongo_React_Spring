import React, { useEffect, useState } from 'react'
import { acceptDemande, deleteDemande } from '../controllers/ManagerController'

const OneDemande = ({id,model,year,firstName,LastName,from,to,man,price}) => {
    const [clicked,setClicked]=useState(false)
    const handleDelete=()=>{
        deleteDemande(id)
    }
    const handleAccept=()=>{
        acceptDemande(id);
    }
    const handleClick=()=>{
        setClicked(!clicked);
    }
    const anima=[
        {opacity:'0',top:'50px'},
        {opacity:'0.1',top:'90px'},
        {opacity:'0.7',top:'130px'},
        {opacity:'1',top:'170px'},
    ]
    const animaRev=[
        {opacity:'1',top:'170px'},
        {opacity:'0.7',top:'130px'},
        {opacity:'0.1',top:'90px'},
        {opacity:'0',top:'50px'},
    ]
    const timing={
        iterations:1,
        duration:700
    }
    useEffect(()=>{
        if(clicked){
            document.getElementById(id+"by").style.display="flex"
            document.getElementById(id+"by").animate(anima,timing);
            setTimeout(()=>{
                document.getElementById(id+"by").style.opacity="1"
                document.getElementById(id+"by").style.top="170px"
            },680)
            document.getElementById(id+"arr").innerHTML="<i class='fa-solid fa-arrow-up fa-lg' />"
        }else{
            document.getElementById(id+"by").animate(animaRev,timing);
            setTimeout(()=>{
                document.getElementById(id+"by").style.display="none"
                document.getElementById(id+"by").style.opacity="0"
                document.getElementById(id+"by").style.top="0px"
            },680)
            document.getElementById(id+"arr").innerHTML="<i class='fa-solid fa-arrow-down fa-lg' />"
        }
    },[clicked])
   let fromdate= new Date(from)
   let todate=new Date(to)
   let diff=Math.abs(fromdate-todate)
   let diffDays=Math.floor(diff / (1000*60*60*24))
  return (
    <div className='demande' id={id}>
        <div className='top'>
            <div className='infCar'>
                <div>
                    <p><span>Car: </span>{model} {year}</p>
                </div>
                <div>
                    <p><span>Price:</span>{price} dh/Day</p>
                </div>
            </div>
            <div className='dates'>
                <div>
                    <p><span>From: </span>{fromdate.getFullYear()+"/"+(fromdate.getMonth()+1)+"/"+fromdate.getDate()}</p>
                </div>
                <div>
                    <p><span>To: </span>{todate.getFullYear()+"/"+(todate.getMonth()+1)+"/"+todate.getDate()}</p>
                </div>
            </div>
            <div className='btns'>
                <button onClick={handleAccept} style={{backgroundColor:"green", color:"white"}}>Accept</button>
                <button onClick={handleDelete} style={{backgroundColor:"red", color:"white"}}>Refuse</button>
                <div className='arr' onClick={handleClick} id={id+"arr"}>
                    <i class="fa-solid fa-arrow-down fa-lg" />
                </div>
            </div>
        </div>
        <div className='by' id={id+"by"}>
            <div style={{backgroundColor:"#141E46"}}>
                <p><span>By: </span>{man}</p>
            </div>
            <div>
                <p><span>Client: </span>{firstName} {LastName}</p>
            </div>
            <div className='total'>      
                <p>{diffDays} days <i class="fa-solid fa-arrow-right fa-lg"></i> {diffDays * price} Dh</p>    
            </div>
        </div>
    </div>
  )
}

export default OneDemande