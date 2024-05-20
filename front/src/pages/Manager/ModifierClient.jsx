import React, { useEffect, useState } from 'react'
import Waiting from '../../components/Waiting'
import Nav from '../../components/Nav'
import InputLog from '../../components/InputLog'
import { modifyClient } from '../../controllers/ManagerController'
import { findClient } from '../../controllers/AdminController'

const ModifierClient = () => {
    const params=new URL(document.location).searchParams
    const id=params.get('id')
    const [infos,setInfos]=useState({first_name:"",last_name:"",email:"",phone:""})
    const [err,setErr]=useState("");
    const handleClick=(e)=>{
        e.preventDefault()
        modifyClient(infos,id,setErr)
    }
    useEffect(()=>{
        let idT=setTimeout(()=>{ 
           findClient(setInfos,id)
        },700)
        return ()=>clearTimeout(idT)
    },[])
  return (
    <>
    <Nav/>
    <section className='sec ajouterMan'>
        {
            infos.first_name!==""?
        <div className='formContainer'>
            <h1>Update Client</h1>
            {err!==""?<p className='err'>{err}</p>:null}
            <form action="" method='POST'>
                <InputLog
                    type="email"
                    name="email"
                    placeholder="E-Mail..."
                    value={infos.email}
                    setLogins={setInfos}
                />
                <InputLog
                    type="text"
                    name="first_name"
                    placeholder="First Name..."
                    value={infos.first_name}
                    setLogins={setInfos}
                />
                <InputLog
                    type="text"
                    name="last_name"
                    placeholder="Last Name..."
                    value={infos.last_name}
                    setLogins={setInfos}
                />
                <InputLog
                    type="text"
                    name="phone"
                    placeholder="phone..."
                    value={infos.phone}
                    setLogins={setInfos}
                />
                <button type='submit' onClick={(e)=>handleClick(e)}>Update</button>
            </form>
        </div>:<Waiting/>
        }
    </section>
    </>
  )
}

export default ModifierClient