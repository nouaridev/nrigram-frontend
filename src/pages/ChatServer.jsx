
import { Outlet } from "react-router-dom";
import ConversationsBar from "../components/layout/conversationBar/conversationsBar";
import NavBar from "../components/layout/navbar/navBar";
import '../styles/global.css'
import Loader from "../components/layout/loader";
import { useLoader } from "../contexts/loaderContext";
import { useEffect } from "react";

export default function ChatServer(){
    const [loading , setLoading] = useLoader() ;
    useEffect(()=>{
        if (Notification.permission === "default") {
           Notification.requestPermission();
        }
    },[])
    return <div className="pageBody">
            <div className="content">
                <div className="layout">
                    <NavBar></NavBar>
                    <div className="main">
                        <ConversationsBar></ConversationsBar>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        {loading && <Loader></Loader>}
            </div>
}



    