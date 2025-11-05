import styles from './sideBar.module.css'
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faKey, faPalette, faRightFromBracket, faUserPen, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { usePfData } from '../../../contexts/profileContext';

export default function SideBar(){
    const [pfData ,setPfData] = usePfData();  
    const changeOption = (op)=>{
        setPfData({...pfData, sideBarOption: op});
    }
    return <div className={styles.sideBar}>
        <Link to='/profile'>
            <div className={styles.iconHolder} onClick={()=>{changeOption('view')}}>
                <FontAwesomeIcon className={styles.icon}  style={pfData.sideBarOption=="view"?{color: 'var(--primary-blue)'}:{color: 'var(--medium-blue)'}} icon={faEye} />
            </div>
        </Link>
        <Link to='/profile/edit'>
            <div className={styles.iconHolder} onClick={()=>{changeOption('edit')}}>
                <FontAwesomeIcon className={styles.icon}   style={pfData.sideBarOption=='edit'?{color: 'var(--primary-blue)'}:{color: 'var(--medium-blue)'}} icon={faUserPen} />
            </div>
        </Link>
        <Link to='/profile/security'>
            <div className={styles.iconHolder} onClick={()=>{changeOption('security')}}>
                <FontAwesomeIcon className={styles.icon}  style={pfData.sideBarOption=='security'?{color: 'var(--primary-blue)'}:{color: 'var(--medium-blue)'}} icon={faKey} />
            </div>
        </Link>
        <Link to='/profile/privacy'>
            <div className={styles.iconHolder} onClick={()=>{changeOption('privacy')}}>
                <FontAwesomeIcon className={styles.icon}  style={pfData.sideBarOption=='privacy'?{color: 'var(--primary-blue)'}:{color: 'var(--medium-blue)'}} icon={faUserShield} />
            </div>
        </Link>
        <Link to='/profile/appearance'>
            <div className={styles.iconHolder} onClick={()=>{changeOption('theme')}}>
                <FontAwesomeIcon className={styles.icon}  style={pfData.sideBarOption=='theme'?{color: 'var(--primary-blue)'}:{color: 'var(--medium-blue)'}} icon={faPalette} />
            </div>
        </Link>
        <Link to='/profile'>
            <div className={styles.iconHolder}>
                <FontAwesomeIcon className={styles.icon} style={{color: 'var(--red)'}} icon={faRightFromBracket} />
            </div>
        </Link>
    </div>
}