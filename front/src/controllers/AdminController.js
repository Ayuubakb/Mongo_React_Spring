const { json } = require("react-router-dom");

const getAdminDash=async(setDash)=>{
    const response=await fetch("http://localhost:9090/admin/adminDash",{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setDash(data)
        }
    )
}
const getRanking=async(setDash)=>{
    const response=await fetch("http://localhost:9090/admin/raking",{
        method:"GET",
        credentials:"include"
    })
    await response.json().then(
        (data)=>{
            setDash(data)
        }
    )
}
const ajouterManager=async(e,infos,setErr)=>{
    e.preventDefault();
    const response=await fetch('http://localhost:9090/admin/addManager',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(infos)
    })
    await response.text().then(
        (data)=>{
            setErr(data)
        }
    )
}

const searchMan=async(query,setData)=>{
    const response=await fetch('http://localhost:9090/admin/listMan',{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:'include',
        body:JSON.stringify(query)
    })
    await response.json().then(
        (data)=>{
            setData(data)
        }
    )
}
const deleteMan=async(login,setData)=>{
    const response=await fetch('http://localhost:9090/admin/deleteMan',{
        method:"DELETE",
        headers:{
            "Content-Type":"text/plain"
        },
        credentials:'include',
        body:login
    })
    await response.text().then(
        (data)=>{
            if(data==="Deleted"){
                setData(true)
            }else{
                setData(false)
            }
        }
    )
}

const findMan=async(login,setData)=>{
    const response=await fetch('http://localhost:9090/admin/findMan',{
        method:"POST",
        credentials:'include',
        headers:{
            'Content-Type':'text/plain'
        },
        body:login
    })
    await response.json().then(
        (data)=>{
            setData(data)
        }
    )
}

const updateMan=async(e,login,infos,setErr)=>{
   e.preventDefault();
   let formData=new FormData()
   let blob=new Blob(
    [JSON.stringify(infos)],
    {type:"application/json"}
   )
   formData.append("infos",blob)
   formData.append("login",login)
    const response=await fetch('http://localhost:9090/admin/updateMan',{
        method:"POST",
        credentials:'include',
        body:formData
    })
    await response.text().then(
        (data)=>{
            setErr(data)
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


module.exports={
    ajouterManager,
    searchMan,
    deleteMan,
    findMan,
    updateMan,
    getAdminDash,
    getRanking,
    findClient
}