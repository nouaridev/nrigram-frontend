import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons';

import styles from './conversationsbar.module.css' ; 
import { useSocket } from "../../../contexts/socketIo";
import { useNavigate } from "react-router-dom";
import { useConversations } from "../../../contexts/conversationContext";
import { joinConvetsation } from "../../../services/conversationServices";

export default function ConversationCard({conversation}) {
    const [auth ,setAuth] = useAuth(); 
    const [state ,dispatch] = useConversations();
    const navigate = useNavigate();
  
    const participant = conversation.participants.find(e=>e._id != auth.user.id); 
    
    const socket = useSocket(); 
    useEffect(()=>{
      if(conversation){
        joinConvetsation(conversation._id ,auth.user.id , state.socket)
      }
    },[conversation])
  
    let content 
    let NewMessage 
    if(conversation.lastMessage){
      content = conversation.lastMessage.img && conversation.lastMessage.content == '' ? 'sent a picture':conversation.lastMessage.content
      NewMessage = conversation.lastMessage.readBy.length==0 && conversation.lastMessage.sender._id != auth.user.id && conversation._id != state.openedConversation;
    }
    const openConversation = ()=>{
      navigate('/chat/'+participant._id)
    }


  return (
    <div className={styles.conversationcard} style={{backgroundColor: NewMessage?'var(--seconday-bg-gray)':''}} id={`conversationCard${conversation._id}`} onClick={openConversation}>
      <div className={styles.pfp}>
        {NewMessage && <div className={styles.badge}>New</div>}
        <img src={participant.pfpUrl} alt="" />
      </div>
      <div className={styles.center}>
        <div className={styles.username}>{participant.userName}</div>
        <div className={styles.lastmessage}>{conversation.lastMessage.sender._id == auth.user.id ? "you: " +content: participant.userName.split(' ')[0]+ ": "+ content}</div>
      </div>
      <div className={styles.right}>
        {!conversation.lastMessage.readBy.length == 0 && conversation.lastMessage.sender._id == auth.user.id &&  <div className={styles.read}><FontAwesomeIcon className={styles.readIcon} icon={faCheckDouble} /></div>}
        {participant.online?<div className={styles.active}></div>:<div className={styles.notActive}></div> }
      </div>
    </div>
  );
}
