import { createContext, use, useContext, useEffect, useRef, useState } from "react"
import io from 'socket.io-client'
import { useConversations } from "./conversationContext";
import { useAuth } from "./athContext";

import newMessageSound from "../assets/sounds/newMessage.mp3";
import messagesend from "../assets/sounds/messagesend.mp3";
import { useSound } from "react-sounds";
import {  getConversation, markAsRead } from "../services/conversationServices";
import Message from "../components/chat/chat-area/message/Message";

const socketContext = createContext(null) ; 
export const useSocket = ()=>{
    return useContext(socketContext) ;
}

export default function SocketProvider({children}){
    const [socket , setSocket] = useState() ;
    const [state ,dispatch] = useConversations();
    const [auth , setAth] = useAuth(); 

    const { play } = useSound(newMessageSound);
    const { play:playSendMessage } = useSound(messagesend);
    
    const openedConversationRef = useRef(state.openedConversation);
    const openedUserIdRef = useRef(state.openedUserId);
    const conversationsRef = useRef(state.conversations);
    

    useEffect(() => {
    openedConversationRef.current = state.openedConversation;
    openedUserIdRef.current = state.openedUserId;
    conversationsRef.current = state.conversations
    }, [state.openedConversation, state.openedUserId ,state.conversations]);

    useEffect(()=>{
        if(auth.token && auth.token !== ''){
            const newSocket = io('http://localhost:3000',{
            query: { userId: auth.user.id }  
        }); 

            newSocket.on("recieveMessage", (msg) => {
                console.log(msg)
                if(msg.conversation == openedConversationRef.current){
                    dispatch({type: 'addOCM' , payload: {msgs: msg}})  
                    dispatch({type: 'setCSM' , payload: {mod: 'smooth'}}) 
                    if(msg.sender._id != auth.user.id){
                        markAsRead(dispatch ,newSocket,openedConversationRef.current , auth.user.id )
                    }
                }
                const ids = conversationsRef.current.map(e=>e._id);
                if(ids.includes(msg.conversation)){
                    dispatch({type: 'bringConversationFirst'  , payload:{id:msg.conversation ,msg:msg}})
                }else{
                    getConversation(dispatch, state, msg.conversation);
                }
                
                if(msg.sender._id != auth.user.id){
                    play();
                    if(Notification.permission == "granted"){
                        let content ; 
                        console.log(msg.sender)
                        if(msg.constent != ''){
                            content = msg.content;
                        }else{content= msg.content}
                        console.log(content)
                        new Notification( `${msg.sender.userName}`,{
                            body: content,
                            icon: msg.sender.pfpUrl
                        })
                    }
                }else{
                    playSendMessage();
                }
         
            });
        
            newSocket.on('onlineStatus', ({conversationId , userId, online})=>{
                dispatch({type : 'setOnlineStatus',payload:{conversationId ,userId, online}})
            })
         
            newSocket.on("writing", (e) => {
                    if (e.isTyping == true && e.userId == openedUserIdRef.current) {
                    dispatch({type: 'setOCIT' , payload: {state: true}})  
                    }else if (e.isTyping == false) {
                        dispatch({type: 'setOCIT' , payload: {state: false}}) 
                    }
            });

            newSocket.on('conversationRead', (conversationId , userId)=>{
                dispatch({type: 'readConversation' ,payload: {conversationId, userId}})
            })

            setSocket(newSocket) ; 
            dispatch({type: 'setSocket' ,payload: {socket : newSocket}})

            

            return ()=>{
                newSocket.off("recieveMessage");
                newSocket.off("writing");
                newSocket.off('onlineStatus')
                newSocket.disconnect(); 
            }
        }
    },[auth]) 
    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>
}
