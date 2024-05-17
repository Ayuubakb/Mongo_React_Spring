import React from 'react'

const Reservation = ({client,car,from,to,color,man,price}) => {
    
  return (
    <div className='reservation' style={{backgroundColor:color}}>
        {
            color=="#41B06E"?
                <div className='top'>
                    <span><i class="fa-solid fa-user fa-sm"></i> {man} </span><p> <i class="fa-solid fa-money-bill" style={{color:"#41B06E"}}></i> {price} Dh</p>
                </div>
         :(
            man==="Time Expired"?
                <div className='top' style={{width:"fit-content"}}>
                    <span><i class="fa-solid fa-clock fa-sm"></i> {man} </span>
                </div>
                :
                <div className='top' style={{width:"fit-content"}}>
                    <span><i class="fa-solid fa-user fa-sm"></i> {man} </span>
                </div>
         )
        }
        <div className='bottom'>
            <div>
                <p><span>Client : </span>{client}</p>
            </div>
            <div>
                <p><span>Car : </span>{car}</p>
            </div>
            <div className='dates'>
                <div>
                    <p>{from}</p>
                </div>
                <div className='arrow'>
                    <p><i class="fa-solid fa-arrow-right fa-xl"></i></p>
                </div>
                <div>
                    <p>{to}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reservation