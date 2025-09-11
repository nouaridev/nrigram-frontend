import { useState } from "react";
import { useAuth } from "../../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons';

import styles from './conversationsbar.module.css' ; 

export default function ConversationCard({pfp , name, lastmessage , read , active}) {
    const [New , setNew] = useState(true); 
    read = true ; 
    const [auth ,setAuth] = useAuth(); 
    active = true; 
    // if (lastmessage?.sender?.id !== auth?.user?.id ){
    //     setNew(true)
    // }
  return (
    <div className={styles.conversationcard}>
      <div className={styles.pfp}>
        {New && <div className={styles.badge}>New</div>}
        <img src={auth?.user?.pfpUrl} alt="" />
      </div>
      <div className={styles.center}>
        <div className={styles.username}>{name || 'no name'}</div>
        <div className={styles.lastmessage}>{lastmessage?.content || 'hello there'}</div>
      </div>
      <div className={styles.right}>
        {read && <div className={styles.read}><FontAwesomeIcon className={styles.readIcon} icon={faCheckDouble} /></div>}
        {active?<div className={styles.active}></div>:<div className={styles.notActive}></div> }
      </div>
    </div>
  );
}
