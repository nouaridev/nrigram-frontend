import styles from "../../styles/auth.module.css";
// components
import FormInput from "../../components/common/FormInput/FormInput";
import Loader from "../../components/layout/loader";

// libs
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import cookies from 'js-cookies'

// hooks
import { useAuth } from "../../contexts/athContext";

// font awesome icons && images
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleXmark ,faCamera, faIgloo, faDigitalTachograph} from '@fortawesome/free-solid-svg-icons';
import pfp from '../../assets/illustrations/pfp.svg';
import logo from "../../assets/logo.png";
import { useLoader } from "../../contexts/loaderContext";


export default function SignUp() {
  const navigate = useNavigate() ;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  let [auth, setAuth] = useAuth();
  const [image, setImage] = useState('');
  const [err , setError] = useState('');

  const [loading ,setloading] = useLoader() ;
  
  const dataChecker = ()=>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailTest = emailRegex.test(email) ; 
    if(!image){
      setError('please Provide profile picture')
      return false
    }
    if(userName.length <  3){
      setError('user name must be long than 3 chars')
      return false 
    }
    if(!email){
      setError('invalid email format') ; 
      return false ; 
    }
    if(password.length < 8){
      setError('password should be long then 8 chars');
      return false  ;
    }
    return true ;
  }
  const signup = async () => {
    try {
      setloading(true)

      let datac = dataChecker();
      
      if(!datac){;setloading(false); return }else{setError('') }

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
        cookies.setItem('token' , res.data.token);
        navigate('/')       ;
      }
      console.log(res)
      setloading(false)
    } catch (error) {
      setloading(false)
      console.log(error)
      if([500 , 499 ].includes(error.status)){
        setError('server error please try again later')
        return ; 
      }
      setError(error.response.data.error)
    }
  };
  
  const openInput = ()=>{
    let inpt = document.querySelector('.pfpinput') ; 
    console.log(inpt)
    inpt.click();
  }
  return (
    <>
      <Loader></Loader>
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
                      accept="image/*"
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
              {err && <div className={styles.formError}>{err}</div>}
              <div
                className={styles.formButton}
                style={{ marginTop: "10px" }}
                onClick={signup}
              >
                SIGN UP
              </div>
              <Link to="/login" className={styles.formLink}>
                DO U HAVE AN ACCOUNT ?{" "}
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
