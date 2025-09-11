import { useAuth } from "../../../contexts/athContext";

import ConversationNav from "./conversationNav/conversationNav";
import ConversationInput from "./conversationInputs/ConversationInputs";
import Message from "./message/Message";

import styles from './chatarea.module.css'
export default function ChatArea(){
  const [auth , setAth] = useAuth();
  
  const pfp = auth?.user?.pfpUrl ; 
    return <div className={styles.chatArea}>
      
      <div className={styles.conversationOpened}>
        <ConversationNav></ConversationNav>
        <div className={styles.conversationMessages}>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'other'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'s'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'other'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'s'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'other'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'s'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'other'}}></Message>
          <Message content='hello there how are u doing?' time='10 minutes ago' sender={{type:'s'}}></Message>
        </div>
        <ConversationInput></ConversationInput>
      </div>
    </div>
}