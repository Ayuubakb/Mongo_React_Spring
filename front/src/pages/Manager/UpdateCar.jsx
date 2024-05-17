import React,{useState, useEffect} from 'react'
import { updateCar, findCar } from '../../controllers/ManagerController';
import Waiting from '../../components/Waiting';
import InputLog from '../../components/InputLog';
import Nav from '../../components/Nav';

const UpdateCar = () => {
    let q=new URL(document.location).searchParams;
    let id=q.get("id");
    const [err,setErr]=useState("")
    const [infos,setInfos]=useState({color:"",horsePower:"",brand:"",model:"",year:0,description:"",image:null,fuel:"",transmission:""});
    console.log(infos);
    useEffect(()=>{
        let idT=setTimeout(()=>{ 
            findCar(id,setInfos);
        },700)
        return ()=>clearTimeout()
    },[])
    const handleClick=(e)=>{
        updateCar(e,id,infos,setErr);
    }
  return (
        <>
        <Nav/>
        <section className='sec ajouterMan'>
            {
                infos.color!==""?
            <div className='formContainer'>
                <h1>Update Car</h1>
                {err!==""?<p className='err'>{err}</p>:null}
                <form action="" method='POST' encType='multipart/form-data'>
                        <div className='img' style={{marginTop:"50px"}}>
                            <label><i class="fa-solid fa-upload fa-xl"></i>
                                <input type='file' name='image' accept='image/*'  onChange={(e)=>{setInfos((i)=>{return {...i,['image']:e.target.files[0]}})}}></input>
                            </label>
                        </div>
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
                     <InputLog
                        type="text"
                        name="color"
                        placeholder="color..."
                        value={infos.color}
                        setLogins={setInfos}
                    />
                     <InputLog
                        type="number"
                        name="horsePower"
                        placeholder="HorsePower..."
                        value={infos.horsePower}
                        setLogins={setInfos}
                    />
                    <select name='transmission' onChange={(e)=>{setInfos((i)=>{return {...i,["transmission"]:e.target.value}})}}>
                        {infos.transmission==="Automatic"?<option value="Automatic" selected>Automatic</option>:<option value="Automatic">Automatic</option>}
                        {infos.transmission==="Manual"?<option value="Manual" selected>Manual</option>:<option value="Manual">Manual</option>}
                    </select>
                    <select name='fuel' onChange={(e)=>{setInfos((i)=>{return {...i,["fuel"]:e.target.value}})}}>
                        {infos.fuel==="Petrol"?<option value="Petrol" selected>Petrol</option>:<option value="Petrol">Petrol</option>}
                        {infos.fuel==="Diesel"?<option value="Diesel" selected>Diesel</option>:<option value="Diesel">Diesel</option>}
                        {infos.fuel==="Electric"?<option value="Electric" selected>Electric</option>:<option value="Electric">Electric</option>}
                    </select>
                    <textarea name='description'  onChange={(e)=>{setInfos((i)=>{return {...i,["description"]:e.target.value}})}}>
                        {infos.description}
                    </textarea>
                    <button type='submit' onClick={(e)=>handleClick(e)}>Update</button>
                </form>
            </div>:<Waiting/>
            }
        </section>
        </>
  )
}

export default UpdateCar