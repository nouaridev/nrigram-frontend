import { useAuth } from "../../../contexts/athContext";
import { useSound } from "react-sounds";

import ConversationNav from "./conversationNav/conversationNav";
import ConversationInput from "./conversationInputs/ConversationInputs";
import Message from "./message/Message";

import svg from "../../../assets/illustrations/sayhi.svg";
import newMessageSound from "../../../assets/sounds/newMessage.mp3";
import TypingSound from '../../../assets/sounds/typing.mp3'

import styles from "./chatarea.module.css";
import { data, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useLoader } from "../../../contexts/loaderContext";

import { useSocket } from "../../../contexts/socketIo";
import Typing from "./typingIndicator";
import { checkConversation, fastScroll, getMessages, getUser, joinConvetsation, smoothScroll, trigerUserChange } from "../../../services/conversationServices";

export default function NewChatArea() {
  const { play } = useSound(newMessageSound);
  const { play:playTyping ,stop:stopTyping} = useSound(TypingSound,{
    loop: true 
  });
  const [recipient, setRecipient] = useState(null);
  const [auth, setAth] = useAuth();
  const [loading, setLoading] = useLoader();
  const { userid } = useParams();

  // conversatoin:
  const [scrollBehave, setScrollBehave] = useState("fast");
  const [messages, setMessages] = useState([]);
  const socket = useSocket();
  const [openedConversation, setOpenedConversatoin] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  
  

  
  

  useEffect(() => {
    console.log("user changed");
    getUser([loading, setLoading],setRecipient,userid , auth);
    trigerUserChange(setMessages , setOpenedConversatoin , userid , auth);
  }, [userid]);

  useEffect(() => {
    console.log("conversation changed");
    if (openedConversation) {
      joinConvetsation(openedConversation , socket);
      getMessages(openedConversation ,auth , setScrollBehave , setMessages);
    } else {
      console.log("ssd");
    }

  socket.on("recieveMessage", (msg) => {
    console.log(msg);
    setMessages((old) => [...old, msg]);
    setScrollBehave("smooth");
    play();
    console.log(messages);
  });

  socket.on("writing", (e) => {
    if(recipient){
      if (e.userId == recipient._id && e.isTyping == true) {
        setIsTyping(true);
      }
      if (e.userId == recipient._id && e.isTyping == false) {
        setIsTyping(false);
      }
    }
  });

  return () => {
    socket.off("recieveMessage");
    socket.off("writing");
  };
  }, [openedConversation]);

  const messagesPrint = useMemo(() => {
    let msgs = messages.map((e) => {
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
  }, [messages]);

  useEffect(() => {
    scrollBehave == "fast" ? fastScroll() : smoothScroll();
  }, [messagesPrint]);

  useEffect(() => {
    smoothScroll();
    if(isTyping == true){
      playTyping()
    }else {
      stopTyping()
    }
  }, [isTyping]);

  return (
    recipient && (
      <div className={styles.chatArea}>
        <div className={styles.conversationOpened}>
          <ConversationNav user={recipient}></ConversationNav>
          {openedConversation && messagesPrint ? (
            <div
              id="conversationMessages"
              className={styles.conversationMessages}
            >
              {messagesPrint}
              {isTyping ? <Typing pfp={recipient.pfpUrl}></Typing> : ""}
            </div>
          ) : (
            <div className={styles.newChatArea}>
              <div className={styles.content}>
                <img src={svg} alt="" />
                <h1>
                  there is no messages beetween u and {recipient.userName} !
                </h1>
                <h2> you can say hi to him righ now</h2>
              </div>
            </div>
          )}

          <ConversationInput
            conversationState={[openedConversation, setOpenedConversatoin]}
            recipientId={userid}
          ></ConversationInput>
        </div>
      </div>
    )
  );
}
