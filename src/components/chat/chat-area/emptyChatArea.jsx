import svg from '../../../assets/illustrations/nochatselected.svg'
import styles from './chatarea.module.css'
export default function EmptyChatArea(){
  
    return <div className={styles.chatArea}>
      
      <div className={styles.conversationOpened}>
        <div className={styles.EmptyChatArea}>
          <div className={styles.content}>
            <h1>NO CHAT IS SELECTED</h1>
            <img src={svg} alt="" />
          </div>
        </div>
      </div>
    </div>
}