import React,{useState} from 'react'
import { getDemandes } from '../controllers/ManagerController'

const SearchDemand = ({setDemands}) => {
    const [query,setQuery]=useState({name:"",car:"",date:null})
    const handleClick=()=>{
        getDemandes(query,setDemands)
    }
  return (
    <div className='search'>
        <div>
            <i class="fa-solid fa-signature fa-lg" style={{color:'grey', marginRight:'5px'}}></i>
            <input placeholder="Name..." type='text' name='name' value={query.name} onChange={(e)=>setQuery((q)=>{return {...q,["name"]:e.target.value}})}/>
        </div>
        <div>
            <i class="fa-solid fa-car fa-lg" style={{color:'grey', marginRight:'5px'}}></i>
            <input placeholder="Car..." type='text' name='car' value={query.car} onChange={(e)=>setQuery((q)=>{return {...q,["car"]:e.target.value}})}/>
        </div>
        <div>
            <i class="fa-solid fa-clock fa-lg " style={{color:'grey', marginRight:'5px'}}></i>
            <input type='date' name='date' value={query.date} onChange={(e)=>setQuery((q)=>{return {...q,["date"]:e.target.value}})}/>
        </div>
        <div>
            <button onClick={handleClick}><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>
    </div>
  )
}

export default SearchDemand