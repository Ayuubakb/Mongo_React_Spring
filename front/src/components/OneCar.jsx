import React from 'react'
import { useNavigate } from 'react-router-dom'
const OneCar = ({_id,img,ext,brand,model,year}) => {
    const navigate=useNavigate()
const handleClick=()=>{
    navigate("voiture?id="+ _id);
}
  return (
    <div className='oneCar' onClick={handleClick}>
        <div className='imgContainer'>
            <img src={`data:image/${ext};base64,${img.data}`}></img>
        </div>
        <div className='specs'>
            <h1>{brand} {model} {year}</h1>
        </div>
    </div>
  )
}

export default OneCar