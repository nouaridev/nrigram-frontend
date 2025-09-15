// react  & router & css
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import styles from "./chatarea.module.css";

// components & images
import ConversationNav from "./conversationNav/conversationNav";
import ConversationInput from "./conversationInputs/ConversationInputs";
import Message from "./message/Message";
import Typing from "./typingIndicator";
import svg from "../../../assets/illustrations/sayhi.svg";

// soudns
import { useSound } from "react-sounds";
import TypingSound from '../../../assets/sounds/typing.mp3'

// services
import {  fastScroll ,
   handleCoversationChange,
    handleUserChange,
     smoothScroll} from "../../../services/conversationServices";

// custom hooks
import { useConversations } from "../../../contexts/conversationContext";
import { useAuth } from "../../../contexts/athContext";
import { useLoader } from "../../../contexts/loaderContext";

export default function NewChatArea() {
  const [state , dispatch] = useConversations();
  const [auth, setAth] = useAuth();
  const [loading , setLoading] = useLoader(); 
  const { play:playTyping ,stop:stopTyping} = useSound(TypingSound,{
    loop: true 
  });
  const {userid} = useParams();


  useEffect(()=>{
      dispatch({type: 'setOUI' , payload: {userId: userid}})
  },[userid])

  useEffect(() => {
    if(state.openedUserId){
      console.log("user changed");
      setLoading(true)
      handleUserChange(dispatch ,state)
    }
  }, [state.openedUserId]);
  
  useEffect(() => {
    handleCoversationChange(dispatch , state );
  }, [state.openedConversation]);

  const messagesPrint = useMemo(() => {
    let msgs = state.openedConversationMessages.map((e) => {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let date = new Date(e.createdAt);
      let dateNow = new Date();
      if (
        date.getDate() == dateNow.getDate() &&
        date.getMonth() == dateNow.getMonth()
      ) {
        date = "today " + date.getHours() + ":" + date.getMinutes();
      } else if (
        Math.abs(date.getDate() - dateNow.getDate()) == 1 &&
        date.getMonth() == dateNow.getMonth()
      ) {
        date = "yseterday " + date.getHours() + ":" + date.getMinutes();
      } else if (date.getMonth() == dateNow.getMonth()) {
        date =
          date.getDate() +
          " " +
          weekdays[date.getDay()] +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes();
      }

      if (e.sender._id === auth.user.id) {
        return (
          <Message
            key={e._id}
            content={e.content}
            time={date}
            sender={{ type: "local", pfp: e.sender.pfpUrl }}
          ></Message>
        );
      } else {
        return (
          <Message
            key={e._id}
            content={e.content}
            time={date}
            sender={{ type: "other", pfp: e.sender.pfpUrl }}
          ></Message>
        );
      }
    });
    return msgs;
  }, [state.openedConversationMessages]);

  useEffect(() => {
    state.conversationScrollMod == "fast" ? setTimeout(()=>fastScroll(),[250]) : smoothScroll();
    setTimeout(()=>{
      setLoading(false)
    },[250])
  }, [messagesPrint]);

  useEffect(() => {
    smoothScroll();
    if(state.openedConversationIsTyping == true){
      stopTyping()
      playTyping()
    }else {
      stopTyping()
    }
  }, [state.openedConversationIsTyping]);

  return (
    state.openedUser && !loading && (
      <div className={styles.chatArea}>
        <div className={styles.conversationOpened}>
          <ConversationNav user={state.openedUser}></ConversationNav>
          {state.openedConversation && messagesPrint ? (
            <div
              id="conversationMessages"
              className={styles.conversationMessages}
            >
              {messagesPrint}
              {state.openedConversationIsTyping ? <Typing pfp={state.openedUser.pfpUrl}></Typing> : ""}
            </div>
          ) : (
            <div className={styles.newChatArea}>
              <div className={styles.content}>
                <img src={svg} alt="" />
                <h1>
                  there is no messages beetween u and {state.openedUser.userName} !
                </h1>
                <h2> you can say hi to him righ now</h2>
              </div>
            </div>
          )}

          <ConversationInput></ConversationInput>
        </div>
      </div>
    )
  );
}
