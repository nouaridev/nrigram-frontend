import { useEffect, useMemo, useState } from "react";
import ConversationCard from "./conversationsCard";
import { useAuth } from "../../../contexts/athContext";

import styles from './conversationsbar.module.css' ; 
import api from "../../../services/api";
export default function ConversationsBar(){
  const [auth , setAuth] = useAuth(); 
  const [conversations , setConversations] = useState([]); 
  useEffect(()=>{
    const getConversations = async()=>{
      try {
        let res = await api.get('/main/conversations', {
          headers:{
            Authorization: 'Bearer '+ auth.token
          }
        }) ;
        if(res.status == 200){
          setConversations(res.data.conversations) ;
        }
      } catch (error) {
        console.log(error)
      }
    }
    getConversations() ;
  },[])

  const conversationPrint = useMemo(()=>{
    let convrs = conversations.map(e=>{
      return <ConversationCard key={e._id} conversation={e}></ConversationCard>
    })
    return convrs
  },[conversations])
  // get conversations : 

    return <div className={styles.conversationBar}>
          <div className={styles.buttonGroup}>
            <div className={`${styles.button} ${styles.selected}`}>all</div>
            <div className={`${styles.button}`}>readed</div>
            <div className={`${styles.button}`}>unreaded</div>
            </div>
            
            <div style={{paddingTop: '10px'}} className={styles.conversations}>
              {conversationPrint}
            </div>
    </div>
}