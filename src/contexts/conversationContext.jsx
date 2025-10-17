import { createContext, useContext, useEffect, useReducer } from "react";
import { conversationReducer ,initialState } from "../services/conversationReducer";


const conversationContext = createContext({});

export default function ConversationProvider({children}){
    const [state ,dispatch] = useReducer(conversationReducer , initialState)

    return <conversationContext.Provider value={[state ,dispatch]}>{children}</conversationContext.Provider>
}

export const useConversations = ()=>{return useContext(conversationContext)} ;