import { useState } from "react";
import { useAuth } from "../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckDouble} from '@fortawesome/free-solid-svg-icons';

export default function ConversationCard({pfp , name, lastmessage , read , active}) {
    const [New , setNew] = useState(true); 
    read = true ; 
    const [auth ,setAuth] = useAuth(); 
    active = true; 
    // if (lastmessage?.sender?.id !== auth?.user?.id ){
    //     setNew(true)
    // }
  return (
    <div className="conversation-card">
      <div className="pfp">
        {New && <div className="badge">New</div>}
        <img src={auth?.user?.pfpUrl} alt="" />
      </div>
      <div className="center">
        <div className="username">{name || 'no name'}</div>
        <div className="lastmessage">{lastmessage?.content || 'hello there'}</div>
      </div>
      <div className="right">
        {read && <div className="read"><FontAwesomeIcon className='read-icon' icon={faCheckDouble} /></div>}
        {active?<div className="active"></div>:<div className="not-active"></div> }
      </div>
    </div>
  );
}
