import { useState } from "react";
import FormInput from "../../components/common/FormInput/FormInput";
import styles from '../../styles/auth.module.css' ; 
import logo from'../../assets/logo.png'
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/athContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let [auth ,setAuth] = useAuth();

  const login = async()=>{
    try {
        let data = {
            email , password
        }
        let res = await axios.post('http://localhost:3000/api/user/signin' ,data) ; 
        if(res.status == 200){
            console.log(res)
            setAuth(prev=>{
             return   {
                token : res.data.token , 
                user: res.data.user 
             }
            })
        }
    } catch (error) {
        console.log(error)
    }
  }
  return (
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
            <Link to='/signup' className={styles.formLink}>U DONT HAVE AN ACCOUNT ?</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
