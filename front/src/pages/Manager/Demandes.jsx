import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import { getDemandes } from '../../controllers/ManagerController'
import Waiting from '../../components/Waiting';
import OneDemande from '../../components/OneDemande';
import SearchDemand from '../../components/SearchDemand';

const Demandes = () => {
    const [demandes,setDemandes]=useState(null);
    console.log(demandes);
    console.log(demandes);
    useEffect(()=>{
        getDemandes({name:"",car:"",date:null},setDemandes)
    },[])
  return (
    <>
        <Nav/>
        <section className='sec demandes'>
            <SearchDemand
                setDemands={setDemandes}
            />
            {
                demandes!==null?
                <div className='demandesHolder'>  
                {
                    demandes.map((demande)=>{ 
                        return(
                            <OneDemande
                                id={demande.id}
                                year={demande.year}
                                LastName={demande.lastName}
                                firstName={demande.firstName}
                                from={demande.from}
                                to={demande.to}
                                model={demande.model}
                                man={demande.addedBy}
                                price={demande.price}
                            />
                        )     
                    })
                }
                </div>
                :<Waiting/>
            }
        </section>
    </>
  )
}

export default Demandes