import { createContext, useContext, useEffect, useState } from "react"
import io from 'socket.io-client'

const socketContext = createContext(null) ; 
export const useSocket = ()=>{
    return useContext(socketContext) ;
}

export default function SocketProvider({children}){
    const [socket , setSocket] = useState() ;
    useEffect(()=>{
        const newSocket = io('http://localhost:3000') ; 
        setSocket(newSocket) ; 
        return ()=>{
            newSocket.disconnect(); 
        }
    },[]) 

    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
}