import styles from "../../styles/auth.module.css";
// components
import FormInput from "../../components/common/FormInput/FormInput";
// libs
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

// hooks
import { useAuth } from "../../contexts/athContext";

// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark ,faCamera, faIgloo} from '@fortawesome/free-solid-svg-icons';
import pfp from '../../assets/illustrations/pfp.svg';
import logo from "../../assets/logo.png";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  let [auth, setAuth] = useAuth();
  const [image, setImage] = useState('');

  const signup = async () => {
    try {
    
      let data = new FormData() ;
      data.append('email' ,email)
      data.append('password' ,password)
      data.append('userName' ,userName)
        let inpt = document.querySelector('.pfpinput') ; 
      if(inpt.files[0]){data.append('file' ,inpt.files[0])}

      let res = await axios.post("http://localhost:3000/api/user/signup", data);
      if (res.status == 200) {
        console.log(res);
        setAuth((prev) => {
          return {
            token: res.data.token,
            user: res.data.user,
          };
        });
      }
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  };

  const openInput = ()=>{
    let inpt = document.querySelector('.pfpinput') ; 
    console.log(inpt)
    inpt.click();
  }
  return (
    <div className={styles.holder}>
      <div className={styles.loginLayout}>
        <div className={styles.formSide}>
          <img src={logo} alt="" className={styles.logo}/>
          <form action="">
      
        
            <div className={styles.imageHolder}  >
                <input
                    type="file"
                    onChange={(e) => {
                        setImage(URL.createObjectURL(e.target.files[0]));
                    }}
        
                    className={styles.pfpinput+' pfpinput'}
                />
            
                {image &&  <img
                    src={image}
                    alt=""
                    className={styles.image}
                    
                />}
                <img
                    src={pfp}
                    alt=""
                    className={styles.image}
                    onClick={openInput}
                    style={{ display: image ? "none" : "block" }}
                />

                    
                    
                <FontAwesomeIcon className={styles.closer}   icon={image? faCircleXmark: faCamera} onClick={()=>{image?setImage(''):openInput()}}/>
            </div>
            <FormInput
              label="user name"
              type="text"
              placeholder="smail12"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></FormInput>
            <FormInput
              label="email"
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></FormInput>
            <FormInput
              label="password"
              type="password"
              placeholder="type password here..."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></FormInput>
            <div
              className={styles.formButton}
              style={{ marginTop: "10px" }}
              onClick={signup}
            >
              LOG IN
            </div>
            <Link to="/login" className={styles.formLink}>
              DO U HAVE AN ACCOUNT ?{" "}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
