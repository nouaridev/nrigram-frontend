import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../../contexts/athContext";

import styles from './search.module.css'

// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


import UserCard from "./userCard";
import api from "../../../services/api";

export default function SearchHolder(){
    const [showResutlCard , setshowResultCard] = useState(false) ; 
    const [searchResult , setSearchResult] = useState(null);
    const [searchVal , setSearchVal]  = useState(''); 
    const [auth , setAuth] = useAuth();

    const clear = ()=>{
        setSearchVal('')
        setSearchResult(null);
        setshowResultCard(false)
    }
    const resultCards = useMemo(()=>{
        if(searchResult){
            let cards = searchResult.map(e=>{
            if(e.pfpUrl === auth.user.pfpUrl){
                    return null ;
                }
                return <UserCard clear={clear} key={e._id}  id={e._id} pfp={e.pfpUrl}  userName={e.userName} email={e.email} ></UserCard>
            }).filter(e=> e!= null) ;
            return cards ;
        }else{
            return []
        }
    },[searchResult]);
    
    const Search = async()=>{  
        try {
            let res = await api.get(`/main/search?term=${searchVal}&type=people`,{
            headers:{
                Authorization: 'Bearer '+ auth.token 
            }
            })
            if(res.status == 200){
              setSearchResult(()=>res.data.users || []) ;
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{
        if(searchVal){
         Search();
        }
    },[searchVal])


    return (
        <div style={{width: '100%' , maxWidth: '400px'}}>
            <div className={styles.searchHolder}>
                <div className={styles.search}>
                    <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                    <input type="search" placeholder="Search" value={searchVal} onChange={(e)=>setSearchVal(e.target.value)} onFocus={()=>setshowResultCard(true)}  />
                </div>
                {showResutlCard && ![null , undefined ,''].includes(searchResult)  && <div className={styles.result}>{resultCards}</div>}
            </div>
            {showResutlCard && <div className={styles.bg} onClick={()=>{setshowResultCard(false)}}></div>}
        </div> 
    )

}