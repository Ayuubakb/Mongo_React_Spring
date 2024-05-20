import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import OneClients from '../../components/OneClients'
import { getClients } from '../../controllers/ManagerController'
import Waiting from '../../components/Waiting'

const Clients = () => {
    const [clients,setClients]=useState(null);
    useEffect(()=>{
        getClients(setClients);
    },[])
  return (
    <>
    <Nav/>
    <section className='sec'>
        {
            clients!=null?
            <div>
                {
                    clients.map((cl)=>{
                        return (
                        <OneClients
                            id={cl.idString}
                            firstName={cl.first_name}
                            lastName={cl.last_name}
                            email={cl.email}
                            phone={cl.phone}
                        />)
                    })
                }
            </div>:<Waiting/>
        }
    </section>
    </>
  )
}

export default Clients