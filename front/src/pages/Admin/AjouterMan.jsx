import React, {useState} from 'react'
import Nav from '../../components/Nav'
import InputLog from '../../components/InputLog'
import { ajouterManager } from '../../controllers/AdminController';

const AjouterMan = () => {
    const [infos,setInfos]=useState({firstName:"",lastName:"",branch:"",joiningDate:"",salary:0,login:"",password:"",role:"manager"});
    const [err,setErr]=useState("");
    const handleClick=(e)=>{
        setErr("");
        setInfos((i)=>{return {...i,["joiningDate"]:new Date()}})
        ajouterManager(e,infos,setErr)
    }
  return (
    <>
        <Nav/>
        <section className='sec ajouterMan'>
            <div className='formContainer'>
                <h1>Add a Manager</h1>
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
                    <button type='submit' onClick={handleClick}>Add</button>
                </form>
            </div>
        </section>
    </> 
  )
}

export default AjouterMan