import { createContext } from "react"

const context={
    isLogged:false,
    setIsLogged:()=>{},
    role:"",
    setRole:()=>{}
}

const AuthContext=createContext(context);

export default AuthContext

