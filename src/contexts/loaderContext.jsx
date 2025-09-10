import {  createContext, useContext, useState } from "react";

const loadingContext = createContext('');

export const useLoader = ()=>{return useContext(loadingContext)};

export default function LoadingProvider({children}){
    let [loading ,setLoading] = useState(false) ;
    return <loadingContext.Provider value={[loading ,setLoading]}>{children}</loadingContext.Provider> ;
}