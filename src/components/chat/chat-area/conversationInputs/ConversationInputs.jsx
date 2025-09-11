import styles from './conversationInputs.module.css';
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faImage ,faPaperPlane} from '@fortawesome/free-solid-svg-icons';

export default function ConversationInput(){
    return   <div className={styles.conversationInputs}>
            <div className={styles.left}>
              <div className={styles.imageInput}>
                <input type="file" className={styles.sendImageInput} name="" accept="image" id="" />
                <FontAwesomeIcon className={styles.imageIcon} icon={faImage} />
              </div>
            </div>
            <div className={styles.center}>
              <textarea name="" id=""  rows='1' placeholder='Write a message' onChange={e=>console.log(e.target.value)}></textarea>
            </div>
            <div className={styles.right}>
              <FontAwesomeIcon icon={faPaperPlane} className={styles.send}/>
            </div>
        </div>
}