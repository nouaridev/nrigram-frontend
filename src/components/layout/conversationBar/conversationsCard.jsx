import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons';

import styles from './conversationsbar.module.css' ; 
import { useSocket } from "../../../contexts/socketIo";
import { useNavigate } from "react-router-dom";

export default function ConversationCard({conversation}) {
    const [auth ,setAuth] = useAuth(); 

    const navigate = useNavigate();
  
    const participant = conversation.participants.find(e=>e._id != auth.user.id); 
    

    const socket = useSocket(); 
    useEffect(()=>{
      if(conversation){
        socket.emit('joinConversation' , conversation._id );
      }
    },[conversation])
    console.log(conversation)

    const openConversation = ()=>{
      navigate('/chat/'+participant._id)
    }

    let active  = true ;
  return (
    <div className={styles.conversationcard} onClick={openConversation}>
      <div className={styles.pfp}>
        {!conversation.lastMessage.readBy.includes(auth.user._id) && <div className={styles.badge}>New</div>}
        <img src={participant.pfpUrl} alt="" />
      </div>
      <div className={styles.center}>
        <div className={styles.username}>{participant.userName}</div>
        <div className={styles.lastmessage}>{conversation.lastMessage.sender == auth.user.id ? "you: " + conversation.lastMessage.content:conversation.lastMessage.content}</div>
      </div>
      <div className={styles.right}>
        {conversation.lastMessage.readBy.includes(participant._id) && <div className={styles.read}><FontAwesomeIcon className={styles.readIcon} icon={faCheckDouble} /></div>}
        {active?<div className={styles.active}></div>:<div className={styles.notActive}></div> }
      </div>
    </div>
  );
}
