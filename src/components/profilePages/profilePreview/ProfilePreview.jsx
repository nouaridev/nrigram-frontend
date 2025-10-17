import { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/athContext';
import SideBar from '../../layout/sideBar/SideBar';
import styles from './profilePreview.module.css' ;
import { usePfData } from '../../../contexts/profileContext';
export default function ProfilePreview(props){
    const [auth ,setAth] = useAuth()
    const [pfData ,setPfData] = usePfData(); 

   
    return <div className={styles.ProfilePreviewContainer}>
            <SideBar></SideBar>
            <div className={styles.contentArea}>
                <div className={styles.Header}>
                    <h1>profile</h1>
                    <p>see how ur profile looks like...</p>
                </div>
                <div className={styles.mainContent}>
                   
                    <div className={styles.left}>
                        <div className={styles.text}>
                            <h2>{pfData?.profileData?.userName}</h2>
                            <p>new user</p>
                        </div>
                        <img src={auth.user.pfpUrl} alt="" />
                    </div>
                    <div className={styles.right}>
                        <div className={styles.sectionTitle}>Bio & details</div>
                        <div className={styles.sectionContent}>
                            <div className={styles.userInfo}>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoTitle}>User name</p>
                                    <p className={styles.infoValue}>{auth.user.userName}</p>
                                </div>
                                <div className={styles.infoCard}>
                                    <p className={styles.infoTitle}>Email</p>
                                    <p className={styles.infoValue}>{auth.user.email}</p>
                                </div>
                            </div>
                            <div className={styles.userBio}>
                                <h3>Bio</h3>
                                <p>
                                    {pfData?.profileData?.bio}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </div>
}