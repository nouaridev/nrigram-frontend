import axios from 'axios';
import { useAuth } from '../../../contexts/athContext';
import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';
import { useLoader } from '../../../contexts/loaderContext';
export default function UserCard({clear,id , pfp , userName , email}){
    const [auth ,setAuth] = useAuth() ;
    const navigate = useNavigate() ;
    const [loading , setLoading] = useLoader();  
    const openChat = async()=>{
      try {
        setLoading(true) ;
        let res = await axios.get(`http://localhost:3000/api/main/conversation/exists/${id}` , {
          headers :{
            Authorization: 'bearer ' + auth.token
          }
        })
        if(res.status == 200){
          clear();
          if(res.data.conversation){
            console.log(res.data.conversation)
          }else{
            navigate(`searchchat/${id}`)
          }
        }
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false) ;
      }
    }
    return<div className={styles.card} key={id} onClick={openChat}>
                  <div className={styles.pfp}><img src={pfp} alt="" /></div>
                  <div className={styles.info}>
                    <p className={styles.userName}>{userName}</p>
                    <p className={styles.email}>{email}</p>
                  </div>
                </div>
}