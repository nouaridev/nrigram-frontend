import { useAuth } from "../../contexts/athContext";
// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass ,faCircleInfo ,faSun ,faBell} from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo.png";
export default function NavBar() {
  const [auth, setAuth] = useAuth();

  return (
    <div className="navbar">
      <div className="left">
        <img src={logo} alt="" />
      </div>
      <div className="center">
        <div className="search">
            <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
            <input type="search" placeholder="Search" />
        </div>
        <FontAwesomeIcon icon={faCircleInfo} className="help-icon"/>
      </div>
      <div className="right">
        <div className="toggle-dark-mode"><FontAwesomeIcon className="sun-icon" icon={faSun} /></div>
        <div className="show-notificatons"><div className="new"></div><FontAwesomeIcon className="not-icon" icon={faBell} /></div>
        <div className="pfp">
          <img src={auth.user.pfpUrl} alt="" />
        </div>
      </div>
    </div>
  );
}
