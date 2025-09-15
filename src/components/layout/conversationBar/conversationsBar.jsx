import { useEffect, useMemo, useState } from "react";
import ConversationCard from "./conversationsCard";
import { useAuth } from "../../../contexts/athContext";
import { motion, AnimatePresence } from "framer-motion";

import styles from './conversationsbar.module.css' ; 
import api from "../../../services/api";
import { useConversations } from "../../../contexts/conversationContext";
import { getConversations } from "../../../services/conversationServices";
export default function ConversationsBar(){
  const [auth , setAuth] = useAuth(); 
  const [state ,dispatch] = useConversations()
  useEffect(()=>{
    getConversations(dispatch , state);
  },[])

  const conversationPrint = useMemo(()=>{
    let convrs = state.conversations.map(e=>{
      return <motion.div key={e._id} layout transition={{ duration: 0.3, ease: "easeInOut" }} >
        <ConversationCard key={e._id}  conversation={e}></ConversationCard>
      </motion.div>
    })
    return convrs
  },[state.conversations])

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