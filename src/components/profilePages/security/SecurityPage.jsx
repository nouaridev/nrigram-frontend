import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/athContext';
import SideBar from '../../layout/sideBar/SideBar';
import styles from './Security.module.css' ;
import { usePfData } from '../../../contexts/profileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons';
import FormInput from '../../common/FormInput/FormInput';
import api from '../../../services/api';
import { useLoader } from '../../../contexts/loaderContext';
import Loader from '../../layout/loader';
import { useActionData, useNavigate } from 'react-router-dom';
import { color, setDragLock } from 'framer-motion';
export default function Security(props){
    const [auth ,setAth] = useAuth()
    const [pfData ,setPfData] = usePfData(); 
    const [pfp ,  setPfp] = useState(''); 

    const [loading ,setLoading] = useLoader();
    const navigate = useNavigate();
    const [newEmail , setNewEmail] = useState('');
    const [changeEmailPassword , setChangeEmailPassword] = useState('') ; 
    const [changeEmailErrorMessage , setChangeEmailErrorMessage] = useState('');

    const [currentPassword ,setCurrentPassword] = useState('')
    const [newPassword , setNewPassword] = useState('');
    const [rnewPassword , setrNewPassword] = useState(''); 
    const [redFlag , setRedFlag] = useState(true) ; 

    const [ErrorMessage , setErrorMessage] = useState('') ; 


    useEffect(()=>{
        if(newPassword == rnewPassword ){
            if(newPassword == ''){
                setRedFlag(true)
            }else{
                setRedFlag(false)
                setErrorMessage('') ;
            }

        }else{
            setRedFlag(true); 
            setErrorMessage('passwords does not mathc') ;
        }
    },[newPassword , rnewPassword, currentPassword])

    const [f ,setF] = useState(true)

    const submitPassword = async ()=>{
        setLoading(true );
        try{
            let res =  await api.put('/menu/profile/password' , {
                password: newPassword ,
                oldPassword: currentPassword
            }, {
                'headers':{
                    'Authorization': 'Bearer '+ auth?.token 
                }
            })
            setLoading(false);
        
            if (res.status == 200){
                setErrorMessage(''); 
                navigate(0);
            }
            if(res.data.error){
                console.log('msg updated ')
                setErrorMessage(res.data.error)
            }
        }catch(err){
            setLoading(false);
            console.log(err); 
            if(err.response.data.error){
                console.log('msg updated ')
                setErrorMessage(err.response.data.error)
            }
        }
    }

    const submitEmail = async()=>{
        setLoading(true)
        try{
            console.log(auth )
            let res = await api.put('/menu/profile/email' , {
                email: newEmail ,
                password: changeEmailPassword  
            },{
                'headers':{
                    'authorization': 'Bearer '+ auth?.token
                }
            })
            if (res.status == 200){
                console.log(res.data)
                setChangeEmailErrorMessage(''); 
                navigate(0);
            }
            setLoading(false)
        }catch(err){
            setLoading(false)
            console.log(err);
            if(err.response.data.error){
                console.log('msg updated ')
                setChangeEmailErrorMessage(err.response.data.error)
            }
        }
    }

        return <div className={styles.ProfilePreviewContainer}>
            <SideBar></SideBar>
            <div className={styles.contentArea}>
                <div className={styles.Header}>
                    <h1>Security</h1>
                    <p>Manage security options...</p>
                </div>
                <div className={styles.mainContentHolder}>
                    <div className={styles.mainContent}>
                        <div className={styles.right}>
                            <h2>Change email</h2>
                            <div className={styles.sectionContent}>
                                <form action="">
                                    <div>
                                        <label htmlFor="currentemail" >current email</label>
                                        <input type="email" name='oldemail' readOnly={true} value={auth?.user?.email}/>
                                    </div>
                                    <div>
                                        <label htmlFor="newemail" >new email</label>
                                        <input type="email" name='newemail' value={newEmail} onChange={e=>{setNewEmail(e.target.value)}} placeholder='enter the new email'/>
                                    </div>
                                    <div>
                                        <label htmlFor="password" >current password</label>
                                        <input type="email" name='currentpassword'  value={changeEmailPassword} onChange={e=>{setChangeEmailPassword(e.target.value )}} placeholder='enter ur password for security reasons '/>
                                    </div>
                                 
                                 
                                </form>
                            </div>
                            <p  style={{color: 'red' , fontSize: '12px' , textAlign: 'center'}}>{changeEmailErrorMessage}</p>
                            <button className={styles.submitButton} onClick={submitEmail}>Save changes</button>
                        </div>
                        <div className={styles.right}>
                            <h2>Change password</h2>
                            <div className={styles.sectionContent}>
                                <form action="">
                                    <div>
                                        <label htmlFor="currentPassord" >current password</label>
                                        <input type="password" name='currentPassord' value={currentPassword} onChange={(e)=>{
                                            setCurrentPassword(e.target.value)
                                        }}  placeholder='enter the current password'/>
                                    </div>
                                    <div>
                                        <label htmlFor="newPassword" >new password</label>
                                        <input type="password" name='newPassword'  onChange={(e)=>{
                                            setNewPassword((prev)=>{return e.target.value})
                                    }}  style={redFlag?{border: '1px solid red'}:{border: 'none'}} placeholder='enter the new password'/>
                                    </div>
                                    <div>
                                        <label htmlFor="rpassword" >rewrite new password</label>
                                    <input type="password" name='rpassword' onChange={(e)=>{
                                        setrNewPassword((prev)=>{return e.target.value})
                                    }}  style={redFlag?{border: '1px solid red'}:{border: 'none'}} placeholder='enter new password again' value={rnewPassword} />
                                    </div>
                                 
                                 
                                </form>
                            </div>
                            <p style={{color: 'red' , fontSize: '12px' , textAlign: 'center'}}>{ErrorMessage}</p>
                            <button className={styles.submitButton} style={redFlag?{pointerEvents: "none" , backgroundColor: 'gray'}:{pointerEvents: 'auto'}} onClick={submitPassword}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Loader></Loader>
    </div>
    }
