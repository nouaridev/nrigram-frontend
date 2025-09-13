import styles from "./conversationInputs.module.css";
// font awesome icons && images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useSocket } from "../../../../contexts/socketIo";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../../../contexts/athContext";

export default function ConversationInput({ recipientId }) {
  const [auth, setAuth] = useAuth();
  const socket = useSocket();
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    socket.on("recieveMessage", (msg) => {
      console.log('emeee')
    });
    socket.on('onlineStatus' , (dd)=>console.log(dd))
  }, [socket]);
  const joinConvetsation = (id)=>{
    socket.emit('joinConversation' , id)
  }

  const sendMessage = async () => {
    try {
      if(!inputValue || inputValue === ''){return} 
      let res =await axios.post(
        "http://localhost:3000/api/main/messages",
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
        joinConvetsation(res.data.message.conversation)
      }
    } catch (error) {
      console.log(error);
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
          onChange={(e) => setInputValue(e.target.value)}
        ></textarea>
      </div>
      <div className={styles.right} onClick={sendMessage}>
        <FontAwesomeIcon icon={faPaperPlane} className={styles.send} />
      </div>
    </div>
  );
}
