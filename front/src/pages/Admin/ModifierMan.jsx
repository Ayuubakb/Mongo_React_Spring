import React, { useEffect, useState } from 'react'
import InputLog from '../../components/InputLog';
import Nav from '../../components/Nav';
import { findMan, updateMan } from '../../controllers/AdminController';
import Waiting from '../../components/Waiting';

const ModifierMan = () => {
    let q=new URL(document.location).searchParams;
    let login=q.get("login");
    const [err,setErr]=useState("")
    const [infos,setInfos]=useState({firstName:"",lastName:"",branch:"",joiningDate:"",salary:0,login:"",password:"",role:"manager"});
    useEffect(()=>{
        let idT=setTimeout(()=>{ 
            findMan(login,setInfos);
        },700)
        return ()=>clearTimeout(idT)
    },[])
    const handleClick=(e)=>{
        updateMan(e,login,infos,setErr);
    }
  return (
        <>
        <Nav/>
        <section className='sec ajouterMan'>
            {
                infos.firstName!==""?
            <div className='formContainer'>
                <h1>Update Manager</h1>
                {err!==""?<p className='err'>{err}</p>:null}
                <form action="" method='POST'>
                    <InputLog
                        type="email"
                        name="login"
                        placeholder="E-Mail..."
                        value={infos.login}
                        setLogins={setInfos}
                    />
                    <InputLog
                        type="text"
                        name="firstName"
                        placeholder="First Name..."
                        value={infos.firstName}
                        setLogins={setInfos}
                    />
                    <InputLog
                        type="text"
                        name="lastName"
                        placeholder="Last Name..."
                        value={infos.lastName}
                        setLogins={setInfos}
                    />
                    <InputLog
                        type="text"
                        name="branch"
                        placeholder="Branch..."
                        value={infos.branch}
                        setLogins={setInfos}
                    />
                    <InputLog
                        type="number"
                        name="salary"
                        placeholder="Salary..."
                        value={infos.salary}
                        setLogins={setInfos}
                    />
                    <InputLog
                        type="password"
                        name="password"
                        placeholder="Password..."
                        value={infos.password}
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

export default ModifierMan