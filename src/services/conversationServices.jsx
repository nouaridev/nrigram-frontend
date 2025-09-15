import api from "./api";

// chat area services
  const checkConversation = async (userid ,auth) => {
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
            return res.data.conversation._id
          } else {
            console.log("noRelation");
            return null ; 
          }
        }
      } catch (error) {
        console.log(error);
        return null ;
      }
    };
  const getMessages = async (state) => {
      try {
        let url = "/main/messages/" + state.openedConversation;
        let res = await api.get(url, {
          headers: {
            Authorization: "Bearer " + state.auth.token,
          },
        });
        if (res.status === 200) {
          return res.data.messages
        }else{
          return null
        }
      } catch (error) {
        throw error
      }
    };
    
  const getUser = async (state) => {
        try {
          let res = await api.get(
            `/main/user/${state.openedUserId}`,
            {
              headers: {
                Authorization: "bearer " + state.auth.token,
              },
            }
          );
          if (res.status == 200) {
            return res.data.user
          }else return null
        } catch (error) {
          throw error
        }
      };

  const trigerUserChange = async (dispatch , state) => {
        dispatch({type:'setOCM' , payload: {msgs: []}}); 
        try {
          let conversation = await checkConversation(state.openedUserId ,state.auth);
          if(conversation){
            dispatch({type:'setOC' , payload: {id: conversation}}); 
          }else{
            dispatch({type:'setOC' , payload: {id: null}}); 
          }
        } catch (error) {
          dispatch({type:'setOC' , payload: {id: null}}); 
          throw error
        }
      };
      
  export const markAsRead = (dispatch ,socket , conversation , userId)=>{
    socket.emit('readConversation', {conversationId:conversation, userId})
    dispatch({type: 'readConversation' ,payload: {conversation, userId}})
  }

  export const joinConvetsation = (id ,userId, socket) => {
      socket.emit("joinConversation", {conversationId: id ,userId});
  };

  export const handleCoversationChange = async(dispatch ,state)=>{
    try {
      if(state.openedConversation){
        console.log("conversation changed");
        joinConvetsation(state.openedConversation ,state.auth.user.id, state.socket);
        let messages = await getMessages(state);
        if(state.openedConversation){
          let conversation = state.conversations.find(e=>e._id == state.openedConversation);
          if(conversation.lastMessage.sender._id != state.auth.user.id && !conversation.lastMessage.readBy.includes(state.auth.user.id)){
            markAsRead(dispatch, state.socket ,state.openedConversation,state.auth.user.id)
          }  
        }
        if(messages){
          dispatch({type: 'setOCM' , payload:{msgs: messages}})
          dispatch({type: 'setCSM' , payload:{mod: 'fast'}})
        }
      }
    } catch (error) {
      throw error
    }
  }

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

  export const handleUserChange = async(dispatch , state)=>{
    try {
      let user = await getUser(state) ;
      if (user){
        dispatch({type: 'setOU' , payload:{user}})
      }
      await trigerUserChange(dispatch, state) ;
    } catch (error) {
      console.log(error)
    }
  }

// messaging input : 
  
  export const sendMessage = async (dispatch ,state ,inputValue ,setInputValue) => {
    try {
      if(!inputValue || inputValue === ''){return} 
      let res =await api.post(
        "/main/messages",
        {
          content : inputValue ,
          recipientId: state.openedUserId
        },
        {
          headers: {
            Authorization: "Bearer " + state.auth.token,
            Accept: "Application/json",
          },
        }
      );
      if(res.status == 200){
        if(!state.openedConversation){
          dispatch({type: 'setOC' , payload: {id: res.data.message.conversation}})
        }
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setInputValue('')
    }
  };

  export const typing = (state)=>{
    state.socket.emit("writing" , {conversationId : state.openedConversation ,userId: state.auth.user.id, isTyping: true})
  }
  export const stopTyping = (state)=>{
    state.socket.emit("writing" , {conversationId : state.openedConversation ,userId: state.auth.user.id, isTyping: false})
  }

// conversations bar 
  export const getConversations = async(dispatch , state)=>{
      try {
        let res = await api.get('/main/conversations', {
          headers:{
            Authorization: 'Bearer '+ state.auth.token
          }
        }) ;
        if(res.status == 200){
          dispatch({type: 'setCS' , payload: {conversations: res.data.conversations }})
        }
      } catch (error) {
        console.log(error)
      }
    }
  export const getConversation = async(dispatch , state , id)=>{
      try {
        let res = await api.get(`/main/conversation/${id}`, {
          headers:{
            Authorization: 'Bearer '+ state.auth.token
          }
        }) ;
        if(res.status == 200){
          dispatch({type: 'addCS' , payload: {conversations: res.data.conversation }})
        }
      } catch (error) {
        console.log(error)
      }
    }


  
