import { Outlet, useLocation ,Navigate} from "react-router-dom";
import { useAuth } from "../../contexts/athContext"
import cookies from 'js-cookies';
import { useEffect, useState } from "react";
import PageLoader from "../../components/layout/pageLoader";
import api from "../api";
import { useConversations } from "../../contexts/conversationContext";

export default function RequireAuth(){
    let location = useLocation() ;
    const [auth, setAuth] = useAuth(); 
    const [state ,dispatch] = useConversations() ; 
    const token = cookies.getItem('token');
    const [loading ,setload] = useState(true)
    if(!token || token == ''){
        console.log(auth)
        return <Navigate state={{from : location } }to='/login'></Navigate>
    }
    useEffect(()=>{
        const refresh = async()=>{
                
                try {
                let res = await api.get('/user/refresh-token', {
                headers:{
                    Authorization: 'Bearer '+ token 
                }
                })
                if(res.status == 200){
                    setAuth(()=>{
                        return {
                            token: res.data.token ,
                            user: res.data.user 
                        }
                    })
                    cookies.setItem('token' ,res.data.token) ; 
                    dispatch({type: 'setAuth' , payload: {auth:{token : res.data.token , user: res.data.user }}})
                }
                setload(false)
            } catch (error) {
                setload(false)
                console.log(error);
            }
        }
        refresh(); 
    },[])
    
    return !loading? <Outlet></Outlet>: <PageLoader></PageLoader>;
}