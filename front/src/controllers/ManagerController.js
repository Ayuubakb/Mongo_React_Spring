

const getDash=async(setDash)=>{
    const response=await fetch("http://localhost:9090/user/manDash",{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setDash(data)
        }
    )
}
const getDash2=async(setDash)=>{
    const response=await fetch("http://localhost:9090/user/manDash2",{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setDash(data)
        }
    )
}

const addCar=async(e,infos,setErr)=>{
    e.preventDefault();
    let formdata=new FormData();
    formdata.append("photo",infos.image)
    infos.image=null;
    let blob=new Blob(
        [JSON.stringify(infos)],
        {type:"application/json"}
    )
    formdata.append("car",blob)
    const response=await fetch("http://localhost:9090/car/addCar",{
        method:"POST",
        credentials:"include",
        body:formdata
    })
    await response.text().then(
        (data)=>{
            setErr(data)
        }
    )
}

const findCars=async(query,setCars)=>{
    if(query.year==null)
        query.year=0
    const response=await fetch("http://localhost:9090/car/findCars",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(query)
    })
    await response.json().then(
        (data)=>{
            setCars(data)
        }
    )
}

const findCar=async(id,setCar)=>{
    const response=await fetch("http://localhost:9090/car/findCar/"+id,{
        method:"GET",
        credentials:"include",
    })
    await response.json().then(
        (data)=>{
            setCar(data)
        }
    )
}

const deleteCar=async(id,setDeleted)=>{
    const response=await fetch("http://localhost:9090/car/deleteCar/"+id,{
        method:"DELETE",
        credentials:"include",
    })
    await response.text().then(
        (data)=>{
            if(data==="Deleted")
                setDeleted(true)
        }
    )
}

const updateCar=async(e,id,infos,setErr)=>{
    e.preventDefault()
    let formdata=new FormData();
    if(infos.image.photoBase==null){
        formdata.append('photo',infos.image)
    }else{
        let blob2=new Blob(
            [JSON.stringify(infos.image)],
            {type:"application/json"}
        )
        formdata.append('photoTr',blob2)
    }
    let blob=new Blob(
        [JSON.stringify(infos)],
        {type:"application/json"}
    )
    formdata.append("car",blob)
    const response=await fetch("http://localhost:9090/car/updateCar/"+id,{
        method:"POST",
        credentials:"include",
        body:formdata
    })
    await response.text().then(
        (data)=>{
            setErr(data)
        }
    )
}

const getClients=async(setClients)=>{
    const response=await fetch("http://localhost:9090/clients/getClients",{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setClients(data)
        }
    )
}

const ajouterClient=async(client,setErr,setInfos)=>{
    const response=await fetch("http://localhost:9090/clients/addClient",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(client)

    })
    await response.text().then(
        (data)=>{
            if(response.ok){
                setInfos((i)=>{
                    return {...i,["id_client"]:data}
                })
                setErr("Client Added")
            }else
                setErr(data)
        }
    )
}

const deleteClient=async(id)=>{
    const response=await fetch("http://localhost:9090/clients/deleteClient/"+id,{
        method:"PUT",
        credentials:"include"
    })
    await response.text().then(
        (data)=>{
            if(data=="done"){
                document.getElementById(id).style.display="none";
            }
        }
    )
}

const modifyClient=async(infos,id,setErr)=>{
    const formData=new FormData();
    const blob=new Blob(
        [JSON.stringify(infos)],
        {type:"application/json"}
    )
    formData.append("infos",blob)
    formData.append("id",id)
    const response=await fetch("http://localhost:9090/clients/updateClient",{
        method:"POST",
        credentials:"include",
        body:formData
    })
    await response.text().then(
        (data)=>{
            setErr(data);
        }
    )
}

const findClient=async(setInfo, id)=>{
    const response=await fetch("http://localhost:9090/clients/getClient/"+id,{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setInfo(data)
        }
    )
}

const ajouterReser=async(infos,setErr)=>{
    infos.price=parseInt(infos.price)
    infos.status=parseInt(infos.status)
    const response=await fetch("http://localhost:9090/booking/addBooking",{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(infos)
    })
    await response.text().then(
        (data)=>{
            setErr(data)
        }
    )
}

const getDemandes=async(query,setDemandes)=>{
    const response=await fetch("http://localhost:9090/booking/demands",{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(query)
    })
    await response.json().then(
        (data)=>{
            setDemandes(data)
        }
    )
}

const deleteDemande=async(id)=>{
    const response=await fetch("http://localhost:9090/booking/refuseBooking/"+id,{
        method:"PUT",
        credentials:"include"
    })
    await response.text().then(
        (data)=>{
            if(data=="done"){
                document.getElementById(id).style.display="none";
            }
        }
    )
}
const acceptDemande=async(id)=>{
    const response=await fetch("http://localhost:9090/booking/acceptBooking/"+id,{
        method:"PUT",
        credentials:"include"
    })
    await response.text().then(
        (data)=>{
            if(data=="done"){
                document.getElementById(id).style.display="none";
            }
        }
    )
}
const getRes=async(query,setRes)=>{
    const response=await fetch("http://localhost:9090/booking/reservations",{
        method:"POST",
        credentials:"include",
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(query)
    })
    await response.json().then(
        (data)=>{
           setRes(data)
        }
    )
}


module.exports={
    addCar,
    findCars,
    findCar,
    deleteCar,
    updateCar,
    getClients,
    ajouterClient,
    ajouterReser,
    getDemandes,
    deleteDemande,
    acceptDemande,
    getRes,
    getDash,
    getDash2,
    deleteClient,
    modifyClient,
    findClient
}