import { useAuth } from '../../../../contexts/athContext';
import styles from './conversationNav.module.css' ;
export default function ConversationNav(){
    const [auth , setAth] = useAuth() ; 

    const pfp = auth.user.pfpUrl ; 
    return   <div className={styles.conversationNav}>
                <div className={styles.left}>
                  <div className={styles.pfp}>
                    <img src={pfp} alt="" />
                    <div className={styles.active}></div>
                  </div>
                  <div className={styles.text}>
                    <p className={styles.name}>name</p>
                    <p className={styles.email}>example@example.com</p>
                  </div>
                </div>
                <div className={styles.right}></div>
            </div>
}