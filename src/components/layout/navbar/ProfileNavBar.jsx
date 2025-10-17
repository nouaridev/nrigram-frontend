import { useAuth } from "../../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun ,faBell, faLeftLong} from '@fortawesome/free-solid-svg-icons';
import logo from "../../../assets/logo.png";

import styles from './navbar.module.css';
import { Link } from "react-router-dom";
export default function ProfileNavBar() {
  const [auth, setAuth] = useAuth();
  
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} onClick={()=>{window.location.reload()}} alt="" />
        <Link to='/'>
          <div className={styles.backIconHolder}>
              <FontAwesomeIcon className={styles.backIcon} icon={faLeftLong}></FontAwesomeIcon>
          </div>
        </Link>
      </div>
      <div className={styles.center}>
       
      </div>
      <div className={styles.right}>
        <div className={styles.toggleDarkMode}><FontAwesomeIcon className={styles.sunIcon} icon={faSun} /></div>
        <div className={styles.showNotfications}><div className={styles.new}></div><FontAwesomeIcon className={styles.notIcon} icon={faBell} /></div>
      </div>
    </div>
  );
}
