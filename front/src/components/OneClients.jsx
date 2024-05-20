import React from 'react'
import { deleteClient } from '../controllers/ManagerController'
import { useNavigate } from 'react-router-dom'

const OneClients = ({id,firstName,lastName,email,phone}) => {
    const navigate=useNavigate()
    const handleEdit=()=>{
        navigate("../updateClient?id="+id)
    }
    const handleDelete=()=>{
        deleteClient(id)
    }
  return (
    <div className='oneClient' id={id}>
        <div className='infos'>
            <div>
                <p><span>FirstName : </span>{firstName}</p>
            </div>
            <div>
                <p><span>LastName : </span>{lastName}</p>
            </div>
            <div>
                <p><span>Email : </span>{email}</p>
            </div>
            <div>
                <p><span>Phone : </span>{phone}</p>
            </div>
        </div>
        <div className='btns'>
            <div className='btn' onClick={handleDelete}>
                <p><i class="fa-solid fa-user-minus" style={{color:"white"}}></i></p>
            </div>
            <div className='btn' style={{backgroundColor:"green"}} onClick={handleEdit}>
                <p><i class="fa-solid fa-user-pen" style={{color:"white"}}></i></p>
            </div>
        </div>
    </div>
  )
}

export default OneClients