import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/athContext';
import SideBar from '../../layout/sideBar/SideBar';
import styles from './editProfile.module.css' ;
import { usePfData } from '../../../contexts/profileContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faClose } from '@fortawesome/free-solid-svg-icons';
import FormInput from '../../common/FormInput/FormInput';
import api from '../../../services/api';
import { useLoader } from '../../../contexts/loaderContext';
import Loader from '../../layout/loader';
export default function EditProfile(props){
    const [auth ,setAth] = useAuth()
    const [pfData ,setPfData] = usePfData(); 
    const [pfp ,  setPfp] = useState(''); 

    const [loading ,setLoading] = useLoader();

    const [name, setName] = useState('')
    const [userName, setUserName] = useState('')
    const [bio, setBio] = useState('')

    const [f ,setF] = useState(true)
    useEffect(()=>{
        if(pfData.profileData&&f){
            setPfData({...pfData, sideBarOption: 'edit'});
            setF(false)

            setName(pfData.profileData.name)
            setUserName(pfData.profileData.userName)
            setBio(pfData.profileData.bio)
        }
    },[pfData])


    const submitEdit = async()=>{
        setLoading(true)
        const form =  new FormData();
        form.append('name',name)
        form.append('userName',userName)
        form.append('bio',bio)
        if(pfp){
            form.append('file' , pfp)
        }
        try {
            const res = await api.put('/menu/profile/edit',form ,{
                headers:{
                    'Authorization': 'Bearer ' + auth?.token 
                }
            })
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        } 
    }

        return <div className={styles.ProfilePreviewContainer}>
            <SideBar></SideBar>
            <div className={styles.contentArea}>
                <div className={styles.Header}>
                    <h1>Edit Profile</h1>
                    <p>change ur Profile Informations...</p>
                </div>
                <div className={styles.mainContentHolder}>
                    <div className={styles.mainContent}>
                        <div className={styles.left}>
                            <div className={styles.upload}>
                                <div className={styles.cameraHolder} onClick={()=>{
                                        pfp?setPfp(''):document.querySelector('#imageInput').click();
                                    }} >
                                    {pfp?<FontAwesomeIcon className={styles.camera} icon={faClose} />:<FontAwesomeIcon className={styles.camera} icon={faCamera} />}
                                </div>
                                <div className={styles.pfpHolder}>
                                    {!pfp && <img src={auth.user.pfpUrl} alt="" />}
                                    {pfp && <img src={URL.createObjectURL(pfp)} alt="" />}
                                </div>
                                <input type="file" id='imageInput' className={styles.imageInput}  onChange={(e)=>{setPfp(e.target.files[0])}} accept='image/*'  style={{position:'absolute' , zIndex: '-10' , opacity: '0'}}/>
                            </div>
                            
                        </div>
                        <div className={styles.right}>
                            <div className={styles.sectionContent}>
                                <form action="">
                                    <div>
                                        <label htmlFor="name">name</label>
                                        <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} name='name' placeholder='enter' />
                                    </div>
                                    <div>
                                        <label htmlFor="userName">user name</label>
                                        <input type="text" value={userName} onChange={(e)=>{setUserName(e.target.value)}} name='userName' placeholder='enter' />
                                    </div>
                                    <div>
                                        <label htmlFor="bio">bio</label>
                                        <textarea name="bio" value={bio} placeholder='enter new bio' onChange={(e)=>{setBio(e.target.value)}} id=""></textarea>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button className={styles.submitButton} onClick={submitEdit}>Submit</button>
                </div>
            </div>
            <Loader></Loader>
    </div>
    }
