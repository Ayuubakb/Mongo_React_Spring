import React, { useEffect, useState } from 'react'
import { deleteMan } from '../controllers/AdminController'
import { useNavigate } from 'react-router-dom'

const OneMnager = ({login,lastName,firstName,salary,branch,joiningDate,added,accepted,refused}) => {
    const navigate=useNavigate();
    const [deleted,setIsDeleted]=useState(false)
    const handleDelete=()=>{
        deleteMan(login,setIsDeleted);
    }
    const handleEdit=()=>{
        navigate("../modifierManager?login="+login);
    }
    useEffect(()=>{
        if(deleted)
            document.getElementById(lastName+login).style.display="none"
    },[deleted])
  return (
    <div className='OneManager' id={lastName+login}>
        <div className='info'>
            <div>
                <div>
                    <p><span>LastName: </span>{lastName}</p>
                </div>
                <div>
                    <p><span>FirstName: </span>{firstName}</p>
                </div>
                <div>
                    <p><span>Salary: </span>{salary} DH</p>
                </div>
                <div>
                    <p><span>Branch: </span>{branch}</p>
                </div>
                <div>
                    <p><span>Joined: </span>{joiningDate}</p>
                </div>
            </div>
            <div>
                <div className='contr'>
                    <p><span>Contributions : </span></p>
                </div>
                <div className='stats'>
                    <div>
                        <p><span>Added : </span>{added} Demande</p>
                    </div>
                    <div>
                        <p><span style={{color:"#41B06E"}}>Accepted : </span>{accepted} Reservation</p>
                    </div>
                    <div>
                        <p><span style={{color:"#CF0A0A"}}>Refused : </span>{refused} Reservation</p>
                    </div>
                </div>
            </div>
        </div>
        <div className='btns'>
            <div className='btn' onClick={handleDelete}>
                <p><i class="fa-solid fa-user-minus"></i></p>
            </div>
            <div className='btn' style={{backgroundColor:"green"}} onClick={handleEdit}>
                <p><i class="fa-solid fa-user-pen"></i></p>
            </div>
        </div>
    </div>
  )
}

export default OneMnager