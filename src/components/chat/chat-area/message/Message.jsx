import { useAuth } from '../../../../contexts/athContext'
import styles from './message.module.css'
export default function Message({ content , time, sender}){
    const [auth ,setAth] = useAuth() ;
    
    return <div className={sender.type == 'other'? styles.external : styles.local}>
        <div className={styles.pfp}><img src={sender.pfp} alt="" /></div>
        <div className={styles.body}>
            <div className={styles.content}><p>{content}</p></div>
            <div className={styles.time}><p>{time}</p></div>
        </div>
    </div>
}