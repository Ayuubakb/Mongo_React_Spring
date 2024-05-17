import React, { useEffect, useState } from 'react'
import InputLog from '../components/InputLog'
import { loginController } from '../controllers/Authentification'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../controllers/AuthentifiacationContext'

const LoginPages = () => {
    const [logins,setLogins]=useState({Email:"",Password:""})
    const [err,setErr]=useState("")
    const navigate=useNavigate();
    useEffect(()=>{
        if(err==="admin"){
            window.location.href="/admin"
        }else if(err==="manager"){
            window.location.href="/manager"
        }
    },[err])
  return (
    <section className='sec loginSec'>
        <h1>Auto Rental &#128664;</h1>
        <div className='login'>
            <h1>Login</h1>
            {err && err!=="admin" && err!=="manager"?<p className='err'>{err}</p>:null}
            <form action='' method='POST'>  
                <InputLog
                    name="Email"
                    type="email"
                    placeholder="Email..."
                    value={logins.Email}
                    setLogins={setLogins}
                />
                <InputLog
                    name="Password"
                    type="password"
                    placeholder="Password..."
                    value={logins.Password}
                    setLogins={setLogins}
                />
                <button type='submit' onClick={(e)=>{loginController(e,logins,setErr)}}>Login</button>
            </form>
        </div>
    </section>
  )
}

export default LoginPages