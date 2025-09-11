
import ChatArea from "../components/chat/chat-area/chatArea";
import ConversationsBar from "../components/layout/conversationsBar";
import NavBar from "../components/layout/navBar";

export default function ChatServer(){
    return <div className="layout">
                <NavBar></NavBar>
                <div className="main">
                    <ConversationsBar></ConversationsBar>
                    <ChatArea></ChatArea>
                </div>
            </div>
}