import styles from "./conversationInputs.module.css";
// font awesome icons && images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/athContext";
import { useSocket } from "../../../../contexts/socketIo";
import api from "../../../../services/api";
import { useConversations } from "../../../../contexts/conversationContext";
import { sendMessage, stopTyping, typing } from "../../../../services/conversationServices";

export default function ConversationInput() {
  const [auth, setAuth] = useAuth();
  const [state , dispatch ] = useConversations();
  const [inputValue, setInputValue] = useState("");


  const socket = useSocket()
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
          onFocus={()=>typing(state)}
          onBlur={()=>stopTyping(state)}
        ></textarea>
      </div>
      <div className={styles.right} onClick={()=>sendMessage(dispatch ,state,inputValue ,setInputValue)}>
        <FontAwesomeIcon icon={faPaperPlane} className={styles.send} />
      </div>
    </div>
  );
}
