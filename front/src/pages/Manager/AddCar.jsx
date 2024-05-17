import React,{useState} from 'react'
import InputLog from '../../components/InputLog';
import Nav from '../../components/Nav';
import { addCar } from '../../controllers/ManagerController';

const AddCar = () => {
    const [infos,setInfos]=useState(
        {
            brand:"",
            model:"",
            year:2024,
            color:"",
            horsePower:0,
            description:"",
            image:null,
            fuel:"Petrol",
            transmission:"Automatic"
        });
    const [err,setErr]=useState("");
    const handleClick=(e)=>{
        setErr("");
        addCar(e,infos,setErr)
    }
    const handleChange=(e,name)=>{
        setInfos((i)=>{
            return {...i,[name]:e.target.value}
        })
    }
  return (
    <>
        <Nav/>
        <section className='sec ajouterCar'>
            <div className='formContainer'>
                <h1>Add a Car</h1>
                {err!==""?<p className='err'>{err}</p>:null}
                <form onSubmit={(e)=>handleClick(e)} method='POST' encType='multipart/form-data'>
                    <div>
                        <div className='img'>
                            <label><i class="fa-solid fa-upload fa-xl"></i>
                                <input type='file' name='image' accept='image/*'  onChange={(e)=>{setInfos((i)=>{return {...i,['image']:e.target.files[0]}})}}></input>
                            </label>
                        </div>
                        <div>
                            <InputLog
                                type="text"
                                name="brand"
                                placeholder="Brand..."
                                value={infos.brand}
                                setLogins={setInfos}
                            />
                            <InputLog
                                type="text"
                                name="model"
                                placeholder="Model..."
                                value={infos.model}
                                setLogins={setInfos}
                            />
                            <InputLog
                                type="number"
                                name="year"
                                placeholder="Year..."
                                value={infos.year}
                                setLogins={setInfos}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <InputLog
                                type="text"
                                name="color"
                                placeholder="Color..."
                                value={infos.color}
                                setLogins={setInfos}
                            />
                            <InputLog
                                type="number"
                                name="horsePower"
                                placeholder="Horse Power..."
                                value={infos.horsePower}
                                setLogins={setInfos}
                            />
                        </div>
                        <div>
                            <select onChange={(e)=>handleChange(e,"fuel")} name='fuel'>
                                <option value="Petrol" selected>Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Electric">Electric</option>
                            </select>
                            <select onChange={(e)=>handleChange(e,"transmission")} name='transmission'>
                                <option value="Automatic" selected>Automatic</option>
                                <option value="Manual">Manual</option>
                            </select>
                        </div>
                        <div>
                            <textarea name='description' onChange={(e)=>handleChange(e,"description")}>

                            </textarea>
                        </div>
                        
                        <button type='submit' >Add</button>
                    </div>
                </form>
            </div>
        </section>
    </> 
  )
}

export default AddCar