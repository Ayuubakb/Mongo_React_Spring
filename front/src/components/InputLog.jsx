import React from 'react'

const InputLog = ({type,name,placeholder,value,setLogins}) => {
  return (
    <div className='inputLog'>
        <label>{name} :</label>
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e)=>{setLogins((l)=>{return {...l,[name]:e.target.value}})}}
            required
        />
    </div>
  )
}

export default InputLog