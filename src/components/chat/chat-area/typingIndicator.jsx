import { useAuth } from '../../../contexts/athContext'
import styles from './message/message.module.css'

export default function Typing({ pfp }){
    return <div className={ styles.external } style={{alignItems:'center'}}>
        <div className={styles.pfp} ><img src={pfp} alt="" /></div>
        <div className={styles.body} >
            <div className={styles.content} style={{padding:"10px 20px"}}>
                <div className={styles.dots}></div>
            </div>
        </div>
    </div>
}