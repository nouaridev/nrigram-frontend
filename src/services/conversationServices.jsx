import api from "./api";

export const checkConversation = async (setOpenedConversatoin , setMessages ,userid ,auth) => {
    try {
      let res = await api.get(
        `/main/conversation/exists/${userid}`,
        {
          headers: {
            Authorization: "bearer " + auth.token,
          },
        }
      );
      console.log("checking");
      if (res.status == 200) {
        if (res.data.conversation) {
          console.log("find relation");
          setOpenedConversatoin(res.data.conversation._id);
        } else {
          console.log("noRelation");
          setMessages([]);
          setOpenedConversatoin(null);
        }
      }
    } catch (error) {
      console.log(error);
      setMessages([]);
      setOpenedConversatoin(null);
    }
  };

export const joinConvetsation = (id , socket) => {
    socket.emit("joinConversation", id);
  };

export const getMessages = async (openedConversation ,auth ,setScrollBehave ,setMessages) => {
    try {
      let url = "/main/messages/" + openedConversation;
      let res = await api.get(url, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      });
      if (res.status === 200) {
        console.log(res.data.messages);
        setScrollBehave("fast");
        setMessages((prev) => {
          return res.data.messages;
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const smoothScroll = () => {
    let messagesArea = document.querySelector("#conversationMessages"); // or '#conversationMessages'
    if (messagesArea) {
      messagesArea.scrollTo({
        top: messagesArea.scrollHeight,
        behavior: "smooth",
      });
    }
  };
  
export const fastScroll = () => {
    let messagesArea = document.querySelector("#conversationMessages"); 
    if (messagesArea) {
      messagesArea.scrollTo({
        top: messagesArea.scrollHeight,
      });
    }
  };

export const getUser = async ([loading, setLoading],setRecipient ,userid,auth ) => {
      setLoading(true);
      try {
        let res = await api.get(
          `/main/user/${userid}`,
          {
            headers: {
              Authorization: "bearer " + auth.token,
            },
          }
        );
        if (res.status == 200) {
          setRecipient(() => res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

export const trigerUserChange = async (setMessages , setOpenedConversatoin , userid , auth) => {
      setMessages([]);
      try {
        await checkConversation(setOpenedConversatoin , setMessages ,userid ,auth);
      } catch (error) {
        console.log(error);
      }
    };