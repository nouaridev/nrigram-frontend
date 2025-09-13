import styles from "./conversationInputs.module.css";
// font awesome icons && images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/athContext";
import { useSocket } from "../../../../contexts/socketIo";
import api from "../../../../services/api";

export default function ConversationInput({conversationState,recipientId}) {
  const [auth, setAuth] = useAuth();
  const [inputValue, setInputValue] = useState("");

  const [openedConversation , setOpenedConversatoin] = conversationState ;

  const socket = useSocket()



  const typing = ()=>{
    socket.emit("writing" , {conversationId : openedConversation ,userId: auth.user.id, isTyping: true})
  }
  const stopTyping = ()=>{
    socket.emit("writing" , {conversationId : openedConversation ,userId: auth.user.id, isTyping: false})
  }

  

  const sendMessage = async () => {
    try {
      if(!inputValue || inputValue === ''){return} 
      let res =await api.post(
        "/main/messages",
        {
          content : inputValue ,
          recipientId
        },
        {
          headers: {
            Authorization: "Bearer " + auth.token,
            Accept: "Application/json",
          },
        }
      );
      if(res.status == 200){
        if(!openedConversation){
          setOpenedConversatoin(res.data.message.conversation)
        }
      }
      
    } catch (error) {
      console.log(error);
    } finally {
      setInputValue('')
    }
  };




  return (
    <div className={styles.conversationInputs}>
      <div className={styles.left}>
        <div className={styles.imageInput}>
          <input
            type="file"
            className={styles.sendImageInput}
            name=""
            accept="image"
            id=""
          />
          <FontAwesomeIcon className={styles.imageIcon} icon={faImage} />
        </div>
      </div>
      <div className={styles.center}>
        <textarea
          name=""
          id=""
          rows="1"
          value={inputValue}
          placeholder="Write a message"
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
          onFocus={typing}
          onBlur={stopTyping}
        ></textarea>
      </div>
      <div className={styles.right} onClick={sendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} className={styles.send} />
      </div>
    </div>
  );
}
