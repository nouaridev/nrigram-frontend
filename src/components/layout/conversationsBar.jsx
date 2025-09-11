import ConversationCard from "./conversationsCard";

export default function ConversationsBar(){
    return <div className="conversations-bar">
          <div className="button-group">
            <div className="button selected">all</div>
            <div className="button">readed</div>
            <div className="button">unreaded</div>
            <div className="button">requests</div>
            </div>
            <div style={{paddingTop: '10px'}} className="conversations">
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
               <ConversationCard></ConversationCard>
            </div>
    </div>
}