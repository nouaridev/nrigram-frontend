import { useState } from "react";
import FormInput from "../../components/common/FormInput/FormInput";
import styles from '../../styles/auth.module.css' ; 
import logo from'../../assets/logo.png'
import { Link, replace, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/athContext";
import cookies from 'js-cookies';
import { useLoader } from "../../contexts/loaderContext";
import Loader from "../../components/layout/loader";
import api from "../../services/api";
export default function Login() {
  const navigate = useNavigate() ;
  const location = useLocation(); 
  const from = location.state?.from?.pathname || '/' ;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [auth ,setAuth] = useAuth() ;
  const [err , setError] = useState('');
  const [loading ,setLoading] = useLoader() ;

  const login = async()=>{
    try {
      setLoading(true)
        let data = {
            email , password
        }
        let res = await api.post('/user/signin' ,data) ; 
        if(res.status == 200){
            console.log(res)
            setAuth(prev=>{
             return   {
                token : res.data.token , 
                user: res.data.user 
             }
            })
            cookies.setItem('token' , res.data.token) 
            navigate(from  , {replace : true});
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error) ;
        setError(error.response.data.error)
    }
  }
  return  (
    <>
      <Loader></Loader>
     <div className={styles.holder}>
      <div className={styles.loginLayout}>
        <div className={styles.formSide}>
          <img src={logo} alt=""  className={styles.logo}/>
          
        
          <form action="">
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
            <Link to='/forget' className={styles.formLink} style={{textAlign: 'right'}}>FORGET PASSWORD?</Link>
            <div className={styles.formButton} onClick={login}>
                LOG IN
            </div>
            {err && <div className={styles.formError}>{err}</div>}

            <Link to='/signup' className={styles.formLink}>U DONT HAVE AN ACCOUNT ?</Link>
          </form>
        </div>
      </div>
    </div>
    </>
   
  );
}
