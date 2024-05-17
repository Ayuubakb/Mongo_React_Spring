import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../controllers/Authentification'
import AuthContext from '../controllers/AuthentifiacationContext'
import { checkLogin } from '../controllers/Authentification'

const Nav = () => {
    const navigate=useNavigate()
    const AuthCon=useContext(AuthContext);
    checkLogin(AuthCon.setIsLogged,AuthCon.setRole)
  return (
    <nav>
        <div className='logo'>
            <h1>Auto Rental &#128664;</h1>
        </div>
        <div className='links'>
            <ul>
                {
                AuthCon.role==="admin"?
                <>
                    <Link to="/admin/"><li><i class="fa-solid fa-house"></i></li></Link>
                    <Link to="/admin/ajouterManager"><li>Add Manager</li></Link>
                    <Link to="/admin/listeManagers"><li>Managers List</li></Link>
                </>
                :
                <>
                    <Link to="/manager/"><li><i class="fa-solid fa-house"></i></li></Link>
                    <Link to="/manager/voitures/ajouterVoitures"><li>Add Car</li></Link>
                    <Link to="/manager/voitures"><li>Cars List</li></Link>
                    <Link to="/manager/demandes"><li>Demandes</li></Link>
                    <Link to="/manager/reservations"><li>Reservations List</li></Link>
                </>   
                }
            </ul>
        </div>
        <div className='out'>
            <button onClick={()=>logout(navigate)}><i class="fa-solid fa-right-from-bracket fa-lg"></i></button>
        </div>
    </nav>
  )
}

export default Nav