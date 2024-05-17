import React, { useState } from 'react'
import { getRes } from '../controllers/ManagerController';

const SearchRes = ({setReservations}) => {
    const [query,setQuery]=useState({client:"",car:"",sort:"DESC",status:2});

    const handleClick=()=>{
        getRes(query,setReservations)
    }
  return (
    <div className='resSearch'>
        <div>
            <label>Client :</label>
            <input placeholder='Client...' type='text' name='client' value={query.name} onChange={(e)=>{setQuery((q)=>{return {...q,['client']:e.target.value}})}}/>
        </div>
        <div>
            <label>Car :</label>
            <input placeholder='Car...' type='text' name='car' value={query.car} onChange={(e)=>{setQuery((q)=>{return {...q,['car']:e.target.value}})}}/>
        </div>
        <div>
            <label>Sort :</label>
            <select name='sort' value={query.sort} onChange={(e)=>{setQuery((q)=>{return {...q,['sort']:e.target.value}})}}>
                <option value="DESC" selected>Newest to Oldest</option>
                <option value="ASC">Oldest To Newest</option>
            </select>
        </div>
        <div>
            <label>Status :</label>
            <select name='status' value={query.status} onChange={(e)=>{setQuery((q)=>{return {...q,['status']:e.target.value}})}}>
                <option value={2} selected>--</option>
                <option value={0}>Refused</option>
                <option value={1}>Accepted</option>
            </select>
        </div>
        <div>
            <button className='btn' onClick={handleClick}><i class="fa-solid fa-magnifying-glass fa-lg"></i></button>
        </div>
    </div>
  )
}

export default SearchRes