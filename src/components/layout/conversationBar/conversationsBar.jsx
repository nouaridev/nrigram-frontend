import { useEffect, useState } from "react";
import ConversationCard from "./conversationsCard";
import io from 'socket.io-client'
import axios from "axios";
import { useAuth } from "../../../contexts/athContext";
const socket = io('http://localhost:3000') ; 

import styles from './conversationsbar.module.css' ; 
export default function ConversationsBar(){
  const [auth , setAuth] = useAuth(); 
  const [conversations , setConversations] = useState([]); 
  useEffect(()=>{
    const getConversations = async()=>{
      try {
        let res = await axios.get('http://localhost:3000/api/main/conversations', {
          headers:{
            Authorization: 'Bearer '+ auth.token
          }
        }) ;
        console.log(res) 
      } catch (error) {
        console.log(err)
      }
    }
    // getConversations() ;
  },[])
  // get conversations : 

    return <div className={styles.conversationBar}>
          <div className={styles.buttonGroup}>
            <div className={`${styles.button} ${styles.selected}`}>all</div>
            <div className={`${styles.button}`}>readed</div>
            <div className={`${styles.button}`}>unreaded</div>
            </div>
            
            <div style={{paddingTop: '10px'}} className={styles.conversations}>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
            </div>
    </div>
}