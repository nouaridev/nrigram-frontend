export const initialState = {
    openedConversation : null , 
    openedConversationMessages : [] , 
    openedConversationIsTyping : false ,
    conversationScrollMod : 'fast',
    openedUserId : null , 
    openedUser : null , 
    conversations : [] , 

    socket : null , 
    auth : null 
}

export const conversationReducer = (state ,  action)=>{
    const data = action.payload ; 
    switch (action.type) {
        case 'setOC' :
            return {...state ,openedConversation : data.id };
        case 'addOCM':
            return {...state , openedConversationMessages : [...state.openedConversationMessages , data.msgs]};
        case 'setOCM': 
            return {...state , openedConversationMessages : data.msgs};
        case 'setOCIT':
            return {...state , openedConversationIsTyping : data.state};
        case 'setCSM':
            return {...state , conversationScrollMod: data.mod}
        case 'setCS':
            return {...state , conversations: data.conversations};
        case 'addCS':
            return {...state , conversations:[ data.conversations,...state.conversations] };
        case 'setOUI':
            return {...state , openedUserId:data.userId};
        case 'setOU':
            return {...state , openedUser:data.user};
        case 'setAuth':
            return {...state , auth:data.auth};
        case 'setSocket':
            return {...state , socket:data.socket};
        case "bringConversationFirst": {
            const conversationId = data.id; 
            const conv = state.conversations.find(c => c._id === conversationId);
            if (!conv) return state;
            const newConvs = [
                {...conv  , lastMessage:data.msg, },
                ...state.conversations.filter(c => c._id !== conversationId)
            ];
            return { ...state, conversations: newConvs };
        }
        case 'readConversation':
            let newConversations = state.conversations.map(e=>{
                if(e._id == state.openedConversation){
                    return {
                        ...e,
                        lastMessage: {
                        ...e.lastMessage,
                        readBy: [...e.lastMessage.readBy, state.auth.user.id]
                        }
                    };
                }
                return e ;
            })
            return {...state , conversations:newConversations}

        case 'setOnlineStatus':{
            let conversation = state.conversations.find(c=>c._id == data.conversationId) ;
            let changed = false ;
            let participants = conversation.participants.map(p=>{
                if (p._id == data.userId){
                    if(data.online == p.online){
                        return p; 
                    }else{
                        changed = true ;
                        return {...p , online: data.online}
                    }
                }return p;
            })
            if(!changed){
                return state
            }
            
            let newConversation = {...conversation, 
                participants
            }
            let newConversations = state.conversations.map(c=>{
                if(c._id == newConversation._id){
                    return newConversation
                }return c
            })
    
            return {...state , conversations: newConversations }
        }
        default:
            return state ;
    }
}