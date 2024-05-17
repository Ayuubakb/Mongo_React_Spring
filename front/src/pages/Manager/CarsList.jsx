import React, { useEffect, useState } from 'react'
import SearchCar from '../../components/SearchCar'
import OneCar from '../../components/OneCar'
import Nav from '../../components/Nav'
import { findCars } from '../../controllers/ManagerController'
import Waiting from '../../components/Waiting'

const CarsList = () => {
    const [cars,setCars]=useState(null)
    useEffect(()=>{
        findCars({brand:"",model:"",year:null},setCars)
    },[])
  return (
    <>
        <Nav/>
        <section className='sec listeMan'>
            <SearchCar setCars={setCars}/>
            <div className='carsContainer'>
                {
                    cars!==null?
                    cars.map((car)=>{
                        return (
                            <OneCar
                                _id={car.idString}
                                img={car.image.photoBase}
                                ext={car.image.extension}
                                model={car.model}
                                brand={car.brand}
                                year={car.year}
                            />
                        )
                    })   :     <Waiting/>
                }
            </div>
        </section>
    </>
  )
}

export default CarsList