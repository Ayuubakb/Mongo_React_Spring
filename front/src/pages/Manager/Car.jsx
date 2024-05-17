import React, { useEffect, useState } from 'react'
import { deleteCar, findCar } from '../../controllers/ManagerController'
import Waiting from '../../components/Waiting';
import Nav from '../../components/Nav';
import { useNavigate } from 'react-router-dom';

const Car = () => {
    const navigate=useNavigate();
    const q=new URL(document.location).searchParams;
    const id=q.get('id');
    const [infos,setInfos]=useState(null)
    const [deleted,setDeleted]=useState(false)
    const handleUpdate=()=>{
        navigate("../modifierVoiture?id="+id)
    }
    const handleDelete=()=>{
        deleteCar(id,setDeleted)
    }
    const handlReservation=()=>{
       navigate("../ajouterReservation?id="+id)
    }
    
    useEffect(()=>{
        findCar(id,setInfos);
    },[])
    useEffect(()=>{
        if(deleted){
            navigate("../")
        }
    },[deleted])
  return (
    <>
    <Nav></Nav>
    <section className='sec car'>
        {
            infos!==null?
            <div className='container'>
                <div className='imgContainer'>  
                    <img src={`data:image/${infos.image.extension};base64,${infos.image.photoBase.data}`}/>
                </div>
                <div className='header'>
                    <h1>{infos.brand} {infos.model} {infos.year}</h1>
                </div>
                <div className='specs'>
                    <div>
                        <p><span><i class="fa-solid fa-droplet fa-sm"></i> Color : </span>{infos.color}</p>
                        <p><span><i class="fa-solid fa-bolt fa-sm"></i> Horse Power : </span>{infos.horsePower} hp</p>
                        <p><span>Transmission : </span>{infos.transmission}</p>
                    </div>
                    <div>
                        <p><span><i class="fa-solid fa-gas-pump fa-sm"></i> Fuel : </span>{infos.fuel}</p>
                        <p><span>Description : </span></p><div className='desc'>{infos.description}</div>
                    </div> 
                </div>
                <div className='btns'>
                    <button  onClick={handleUpdate} style={{backgroundColor:"#141E46"}}>Update</button>
                    <button onClick={handleDelete} style={{backgroundColor:"red"}}>Delete</button>
                    <button onClick={handlReservation} style={{backgroundColor:"#41B06E"}}>Make Reservation</button>
                </div>
            </div>:<Waiting/>
        }
    </section>
    </>
  )
}

export default Car