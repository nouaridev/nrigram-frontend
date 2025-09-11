import { useAuth } from "../../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleInfo ,faSun ,faBell} from '@fortawesome/free-solid-svg-icons';
import logo from "../../../assets/logo.png";
import SearchHolder from "../search/searchHolder";

import styles from './navbar.module.css';
export default function NavBar() {
  const [auth, setAuth] = useAuth();
  
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <img src={logo} onClick={()=>{window.location.reload()}} alt="" />
      </div>
      <div className={styles.center}>
        <SearchHolder></SearchHolder>
        <FontAwesomeIcon icon={faCircleInfo} className={styles.helpIcon}/>
      </div>
      <div className={styles.right}>
        <div className={styles.toggleDarkMode}><FontAwesomeIcon className={styles.sunIcon} icon={faSun} /></div>
        <div className={styles.showNotfications}><div className={styles.new}></div><FontAwesomeIcon className={styles.notIcon} icon={faBell} /></div>
        <div className={styles.pfp}>
          <img src={auth.user.pfpUrl} alt="" />
        </div>
      </div>
    </div>
  );
}
