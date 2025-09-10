import { Outlet, useLocation ,Navigate} from "react-router-dom";
import { useAuth } from "../../contexts/athContext"
import cookies from 'js-cookies';
import { useEffect, useState } from "react";
import axios from "axios";
import PageLoader from "../../components/layout/pageLoader";

export default function RequireAuth(){
    let location = useLocation() ;
    const [auth, setAuth] = useAuth(); 
    const token = cookies.getItem('token');
    const [loading ,setload] = useState(true)
    if(!token || token == ''){
        return <Navigate state={{from : location } }to='/login'></Navigate>
    }
    useEffect(()=>{
        const refresh = async()=>{
                try {
                let res = await axios.get('http://localhost:3000/api/user/refresh-token', {
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