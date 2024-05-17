import React, { useState } from 'react'
import { findCars } from '../controllers/ManagerController'

const SearchCar = ({setCars}) => {
    const [query,setQuery]=useState({brand:"",model:"",year:null})
    const handleChange=(name,e)=>{
        setQuery((q)=>{
            return {...q,[name]:e.target.value}
        })
    }
    const handleClick=()=>{
        console.log(query);
        findCars(query,setCars)
    }
  return (
    <div className='search'>
        <div>
            <input placeholder="Brand..." type='text' name='brand' value={query.brand} onChange={(e)=>handleChange("brand",e)}/>
        </div>
        <div>
            <input placeholder="Model..." type='text' name='model' value={query.model} onChange={(e)=>handleChange("model",e)}/>
        </div>
        <div>
            <i class="fa-solid fa-calendar-days fa-lg" style={{color:'grey', marginRight:'5px'}}></i>
            <input placeholder="Year..." type='number' name='year' value={query.year} onChange={(e)=>handleChange("year",e)}/>
        </div>
        <div>
            <button onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>
  )
}

export default SearchCar