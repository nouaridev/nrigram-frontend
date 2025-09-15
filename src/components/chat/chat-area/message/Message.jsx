import { useRef } from 'react';
import { useAuth } from '../../../../contexts/athContext'
import styles from './message.module.css'
import { useConversations } from '../../../../contexts/conversationContext';
export default function Message({content ,img , time, sender ,lastOne ,setShowImg}){
    const [auth ,setAth] = useAuth() ;
    const [state ,dispatch] = useConversations();
    const ref = useRef(null) ;

    const handleImageLoad = ()=>{
        if(ref.current && lastOne){
            ref.current.scrollIntoView({behavior: 'smooth'})
        }
    }
    
    return <div className={sender.type == 'other'? styles.external : styles.local}>
        <div className={styles.pfp}><img src={sender.pfp} alt="" /></div>
        <div className={styles.body}>
            {content != '' && <div className={styles.content}><p>{content}</p></div>}
            {img != '' && <img ref={ref}  loading='lazy' onClick={()=>{setShowImg(img)}} onLoad={handleImageLoad} className={styles.image} src={img}></img>}
            <div className={styles.time}><p>{time}</p></div>
        </div>
    </div>
}