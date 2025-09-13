import { useAuth } from "../../../contexts/athContext";

import ConversationNav from "./conversationNav/conversationNav";
import ConversationInput from "./conversationInputs/ConversationInputs";
import Message from "./message/Message";

import svg from '../../../assets/illustrations/sayhi.svg'

import styles from './chatarea.module.css'
import { useParams } from "react-router-dom";
import { useEffect,useState} from "react";
import axios from "axios";
import { useLoader } from "../../../contexts/loaderContext";
export default function NewChatArea(){
  const [recipient , setRecipient] = useState(null); 
  const [auth , setAth] = useAuth();
  const [loading , setLoading] = useLoader();  

  const {userid} = useParams() ;

  useEffect(()=>{
    const getUser = async()=>{
        setLoading(true)
        try {
            let res = await axios.get(`http://localhost:3000/api/main/user/${userid}` , {
                headers :{
                    Authorization: 'bearer ' + auth.token
                }})
            if(res.status == 200){
                setRecipient(()=>res.data.user)
            }
        } catch (error) {
            console.log(error); 
        } finally {
            setLoading(false);
        }
    }
    getUser(); 
  },[userid])

  

    return recipient && <div className={styles.chatArea}>
      
      <div className={styles.conversationOpened}>
        <ConversationNav user={recipient}></ConversationNav>
             <div className={styles.newChatArea}>
                  <div className={styles.content}>
                    <img src={svg} alt="" />
                    <h1>there is no messages beetween u and {recipient.userName} !</h1>
                    <h2> you can say hi to him righ now</h2>
                  </div>
            </div>
     
        <ConversationInput recipientId={userid}></ConversationInput>
      </div>
    </div>
}