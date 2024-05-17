import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav';
import { ajouterClient, ajouterReser, getClients } from '../../controllers/ManagerController';
import InputLog from '../../components/InputLog';

const AddRes = () => {
    const params=new URL(document.location).searchParams;
    const id=params.get('id');
    const [isClient,setIsClient]=useState(null)
    const [clients,setClients]=useState([{}])
    const [infos,setInfos]=useState({start_date:null,end_date:null,price:100,id_client:"",id_car:id,status:2})
    const [err,setErr]=useState("")
    const [newClient,setNewClient]=useState({first_name:"",last_name:"",email:"",phone:""})
    console.log(infos);
    const handleChange=(e)=>{
        setInfos(
            (i)=>{
                return {...i,[e.target.name]:e.target.value}
            }
        )
    }
    const handleOk=()=>{
        if(infos.start_date==null || infos.end_date==null || infos.id_client==""){
            setErr("Insufficent Informations")
        }else if(infos.start_date > infos.end_date){
            setErr("Absurde Dates")
        }else{
            setErr("")
            ajouterReser(infos,setErr);
        }
    }
    const addClient=()=>{
        ajouterClient(newClient,setErr,setInfos);
    }
    useEffect(()=>{
        getClients(setClients)
    },[])
  return (
    <>
    <Nav/>
    <section className='sec addRes'>
        <div className='holder'>
            <h1>Book A Car</h1>
            {err!==""?<p className='err'>{err}</p>:null}
            <div className='header'>
                <div className='dates'>
                    <span>From :</span><input type='date' name='start_date' value={infos.start_date} onChange={(e)=>handleChange(e)}/>
                    <span>To :</span><input type='date' name="end_date"  value={infos.end_date} onChange={(e)=>handleChange(e)}/>
                </div>
                <input type='number' name="price"  value={infos.price} onChange={(e)=>handleChange(e)} className='price'/> <span>/ PER DAY</span>
                <div className='radios'>
                    <input type='radio' name='isclient' value={true} onClick={()=>setIsClient(true)}/> Existing Client
                    <input type='radio' name='isclient' value={false} onClick={()=>setIsClient(false)}/> New Client
                </div>
            </div>
            {
                isClient?
                <div className='selectClient'>
                    <select name='id_client' onChange={handleChange}>
                        {   
                            clients.map((client)=>{
                                return (
                                    <option value={client.idString}>{client.first_name} {client.last_name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                :(
                    isClient==false?
                    <div className='addClient'>
                        <InputLog
                            type="text"
                            name="first_name"
                            placeholder="First Name..."
                            value={newClient.first_name}
                            setLogins={setNewClient}
                        />
                        <InputLog
                            type="text"
                            name="last_name"
                            placeholder="Last Name..."
                            value={newClient.last_name}
                            setLogins={setNewClient}
                        />
                        <InputLog
                            type="text"
                            name="email"
                            placeholder="email..."
                            value={newClient.email}
                            setLogins={setNewClient}
                        />
                        <InputLog
                            type="text"
                            name="phone"
                            placeholder="Phone..."
                            value={newClient.phone}
                            setLogins={setNewClient}
                        />
                        <button onClick={addClient}>Add Client</button>
                    </div>
                    :null
                )
            }
            <button onClick={handleOk}>OK</button>
        </div>
    </section>
    </>
  )
}

export default AddRes