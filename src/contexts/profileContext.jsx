import { createContext, useContext, useEffect, useState } from "react";

let profileContext = createContext({sideBarOption: 'view' , profileData:null})

export const usePfData = ()=>{return useContext(profileContext)}

export default function ProfileProvider({children}){
    const [pfData , setPfData] = useState({sideBarOption: 'view' , profileData:null})
    return <profileContext.Provider value={[pfData , setPfData]}>
        {children}
    </profileContext.Provider>
}
