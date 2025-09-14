import styles from './search.module.css';
import { useNavigate } from 'react-router-dom';
export default function UserCard({clear,id , pfp , userName , email}){
    const navigate = useNavigate() ;
    const openChat = ()=>{
        clear()
        navigate(`chat/${id}`)
    }
    return<div className={styles.card} key={id} onClick={openChat}>
                  <div className={styles.pfp}><img src={pfp} alt="" /></div>
                  <div className={styles.info}>
                    <p className={styles.userName}>{userName}</p>
                    <p className={styles.email}>{email}</p>
                  </div>
                </div>
}