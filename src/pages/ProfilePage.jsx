
import { Outlet } from "react-router-dom";

import '../styles/global.css'
import Loader from "../components/layout/loader";
import { useLoader } from "../contexts/loaderContext";
import { useEffect} from "react";
import ProfileNavBar from "../components/layout/navbar/ProfileNavBar";
import { usePfData } from "../contexts/profileContext";
import api from "../services/api";
import { useAuth } from "../contexts/athContext";

export default function ProfilePage(){
    const [loading , setLoading] = useLoader() ;
    const [auth, setAth] = useAuth(); 
    const [pfData ,setPfData] = usePfData(); 
    useEffect(()=>{
        const getProfile = async()=>{
            try {
                const res = await api.get('/menu/profile',{
                    headers:{
                        'Authorization': 'Bearer ' + auth.token ,
                    }
                })
                setPfData({...pfData , profileData:res.data})
            } catch (error) {
                console.log(error)
            }
        }
        getProfile();
    },[])    
    return <div className="pageBody">
        <div className="content">
            <div className="layout">
                <ProfileNavBar ></ProfileNavBar>
                <div className="main" style={{padding: '20px 40px'}}>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
        {loading && <Loader></Loader>}
            </div>
}