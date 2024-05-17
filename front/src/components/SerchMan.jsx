import React, { useState } from 'react'
import { searchMan } from '../controllers/AdminController';

const SerchMan = ({setData}) => {
    const [query,setQuery]=useState({name:"",branch:"",salaire:"none",joined:"DESC"});
    const handleClick=()=>{
        searchMan(query,setData);
    }
  return (
    <div className='search'>
        <div>
        <i class="fa-solid fa-signature fa-lg" style={{color:'grey'}}></i> <input type='text' placeholder='Name...' name='name' value={query.name} onChange={(e)=>{setQuery((q)=>{return {...q,["name"]:e.target.value}})}}/>
        </div>
        <div>
        <i class="fa-solid fa-code-branch fa-lg " style={{color:'grey'}}></i> <input type='text' placeholder='Branch...' name='branch' value={query.branch} onChange={(e)=>{setQuery((q)=>{return {...q,["branch"]:e.target.value}})}}/>
        </div>
        <div>
        <i class="fa-solid fa-money-bill fa-lg " style={{color:'grey'}}></i> <select name='salaire' value={query.salaire} onChange={(e)=>{setQuery((q)=>{return {...q,["salaire"]:e.target.value}})}}>
                <option value="none" selected>Sort By Salary</option>
                <option value="DESC">Most Payed First</option>
                <option value="ASC">Less Payed First</option>
            </select>
        </div>
        <div>
        <i class="fa-solid fa-clock fa-lg " style={{color:'grey'}}></i> <select name='joined' value={query.joined} onChange={(e)=>{setQuery((q)=>{return {...q,["joined"]:e.target.value}})}}>
                <option value="DESC" selected>Last To First</option>
                <option value="ASC">First to Last</option>
            </select>
        </div>
        <div>
            <button onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>
  )
}

export default SerchMan