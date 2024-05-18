import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import SearchRes from '../../components/SearchRes'
import Reservation from '../../components/Reservation'
import { getRes } from '../../controllers/ManagerController'
import Waiting from '../../components/Waiting'

const ResList = () => {
  const [reservations,setReservations]=useState(null);
  useEffect(()=>{
    getRes({car:"",sort:"DESC",status:2,client:""},setReservations)
  },[])
  return (
    <>
    <Nav/>
      <section className='resList'>
          <SearchRes setReservations={setReservations}/>
          <div className='resContainer'>
            {
              reservations!=null?
              reservations.map((res)=>{
                let color;
                res.status==1?color="#41B06E":(res.man_firstName==="Time" && res.man_lastName==="Expired"?color="gray":color="rgb(174, 5, 5)")
                let from=new Date(res.start_date)
                let to=new Date(res.end_date)
                let price=res.price * Math.floor((to - from) / (1000*60*60*24))
                return(
                <Reservation
                  client={`${res.cl_firstName} ${res.cl_lastName}`}
                  car={`${res.maker} ${res.model} ${res.year}`}
                  from={`${from.getDate()}/${from.getMonth() + 1}/${from.getFullYear()}`}
                  to={`${to.getDate()}/${to.getMonth() + 1}/${to.getFullYear()}`}
                  color={color}
                  man={`${res.man_firstName} ${res.man_lastName}`}
                  price={price}
                />
                )
              })
              :<Waiting/>
            }
          </div>
      </section>
    </>
  )
}

export default ResList