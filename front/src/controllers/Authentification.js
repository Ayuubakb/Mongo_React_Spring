const loginController=async(e,logins,setErr)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:9090/user/login",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        credentials:"include",
        body:JSON.stringify({login:logins.Email,password:logins.Password})
    })
    await response.text().then(
        (data)=>{
            setErr(data)
        }
    )
}
const checkLogin=async(setIsLogged,setRole)=>{
    const response=await fetch("http://localhost:9090/user/check",{
        method:"GET",
        credentials:"include",
    })
    await response.json().then(
        (data)=>{
            setIsLogged(data.isLogged);
            setRole(data.role);
        }
    )
}

const logout=async(navigate)=>{
    const response=await fetch("http://localhost:9090/user/logout",{
        method:"DELETE",
        credentials:"include",
    })
    await response.text().then(
        (data)=>{
            navigate("/");
        }
    )
}

module.exports={
    loginController,
    checkLogin,
    logout
}