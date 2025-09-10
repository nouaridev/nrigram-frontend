import { createContext, useContext, useState } from "react"

const authCon = createContext({
    token: '', 
    user: {} ,
}) ; 
export const useAuth = ()=>{
    return useContext(authCon) ;
} ; 

export default function AuthProvider({children}){
    let [auth ,setAuth] = useState(authCon) ;

    return <authCon.Provider value={[auth , setAuth]}>
        {children}
    </authCon.Provider>
}