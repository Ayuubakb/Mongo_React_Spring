import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import SerchMan from '../../components/SerchMan'
import OneMnager from '../../components/OneMnager'
import { searchMan } from '../../controllers/AdminController'
import Waiting from '../../components/Waiting'

const ListeMan = () => {
    const [data,setData]=useState(null)
    useEffect(()=>{
        let idT=setTimeout(()=>{
            searchMan({name:"",branch:"",salaire:"none",joined:"DESC"},setData)
        },1000)
        return ()=>clearInterval(idT);
    },[])
  return (
    <>
        <Nav/>
        <section className='sec listeMan'>
            <SerchMan setData={setData}/>
            {
                data!=null?
            <div className='gridContainer'>
                {   
                    data.map((d)=>{
                        return(
                            <OneMnager
                                lastName={d.lastName}
                                firstName={d.firstName}
                                salary={d.salary}
                                joiningDate={new Date(d.joiningDate).getFullYear()+"-"+(new Date(d.joiningDate).getMonth()+1)+"-"+new Date(d.joiningDate).getDate()}
                                branch={d.branch}
                                login={d.login}
                                added={d.numAdded}
                                accepted={d.numAccepted}
                                refused={d.numRefused}
                            />
                        )
                    })
                }
            </div>:<Waiting/>
            }
        </section>
    </>
  )
}

export default ListeMan