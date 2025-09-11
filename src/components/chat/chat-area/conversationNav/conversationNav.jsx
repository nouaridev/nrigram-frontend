import { useAuth } from '../../../../contexts/athContext';
import styles from './conversationNav.module.css' ;
export default function ConversationNav({user}){
    const [auth , setAth] = useAuth() ; 

    const pfp = auth.user.pfpUrl ; 
    return   <div className={styles.conversationNav}>
                <div className={styles.left}>
                  <div className={styles.pfp}>
                    <img src={user.pfpUrl} alt="" />
                    <div className={styles.active}></div>
                  </div>
                  <div className={styles.text}>
                    <p className={styles.name}>{user.userName}</p>
                    <p className={styles.email}>{user.email}</p>
                  </div>
                </div>
                <div className={styles.right}></div>
            </div>
}