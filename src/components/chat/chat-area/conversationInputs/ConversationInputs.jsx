import styles from "./conversationInputs.module.css";
// font awesome icons && images
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faImage,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../contexts/athContext";
import { useConversations } from "../../../../contexts/conversationContext";
import {
  sendMessage,
  stopTyping,
  typing,
} from "../../../../services/conversationServices";
import { styleEffect } from "framer-motion";

export default function ConversationInput() {
  const [auth, setAuth] = useAuth();
  const [state, dispatch] = useConversations();
  const [inputValue, setInputValue] = useState("");
  const [img, setimg] = useState("");
  const [showImg, setShowImg] = useState(false);
  useEffect(()=>{
    const input = document.get
  },[])
  const sendMsg = () => {
    let type ; 
    const formdata = new FormData() ; 
    if(inputValue=='' && img == ''){
      return 
    }else if(inputValue!='' && img != ''){
      type='mixed';
      formdata.append('content' , inputValue) ;
      formdata.append('file' , img) ;
    }else if(inputValue!=''){
      type='text'
      formdata.append('content' , inputValue) ;
    }else if(img != ''){
      type='file'
      formdata.append('file' , img) ;
    }
    formdata.append('type' , type) ;
    formdata.append('recipientId', state.openedUserId) ;
    sendMessage(dispatch ,state ,formdata)
    setInputValue('');
    setimg('')
  };

  const openimageInput = () => {
    let input = document.querySelector("#imageInput");
    input.click();
  };

  return (
    <>
      {showImg && img && (
        <div className={styles.showImg} onClick={() => setShowImg(false)}>
          <img src={URL.createObjectURL(img)} alt="" />
        </div>
      )}
      <div className={styles.conversationInputs}>
        {img && (
          <div className={styles.image} >
            <div className={styles.holder}>
              <div className={styles.closeHolder}>
                <FontAwesomeIcon
                onClick={() => {setShowImg(false) ;setimg("")}}
                className={styles.close}
                icon={faCircleXmark}
              ></FontAwesomeIcon>
              </div>
              <img src={URL.createObjectURL(img)} alt="" onClick={() => setShowImg(true)}/>
            </div>
          </div>
        )}
        <div className={styles.left}>
          <div className={styles.imageInput}>
            <input
              type="file"
              className={styles.sendImageInput}
              name=""
              accept="image/*"
              id="imageInput"
              onChange={(e) => {
                setimg(e.target.files[0]);
              }}
            />
            {!img && (
              <FontAwesomeIcon
                className={styles.imageIcon}
                onClick={openimageInput}
                icon={faImage}
              />
            )}
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
              setInputValue(e.target.value);
            }}
            onFocus={() => typing(state)}
            onBlur={() => stopTyping(state)}
          ></textarea>
        </div>
        <div
          className={styles.right}
          onClick={() =>
            sendMsg()
          }
        >
          <FontAwesomeIcon icon={faPaperPlane} className={styles.send} />
        </div>
      </div>
    </>
  );
}
