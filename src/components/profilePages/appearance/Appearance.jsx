import { useAuth } from "../../../contexts/athContext";
import SideBar from "../../layout/sideBar/SideBar";
import styles from "./appearance.module.css";
import { usePfData } from "../../../contexts/profileContext";
import { useState } from "react";

export default function Appearance(props) {
  const [auth, setAth] = useAuth();
  const [pfData, setPfData] = usePfData();

  const [darkMode , setDarkMOde] = useState(false) ;
  const toggleMode = ()=>{
    darkMode?setDarkMOde(false):setDarkMOde(true)
}
  return (
    <div className={styles.ProfilePreviewContainer}>
      <SideBar></SideBar>
      <div className={styles.contentArea}>
        <div className={styles.Header}>
          <h1>Appearance</h1>
          <p>custumize UI...</p>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.privacyHolder}>
            <div className={styles.pvCard}>
              <div
                className={styles.toggleButton}
                onClick={toggleMode}
                style={
                  darkMode
                    ? {
                        justifyContent: "flex-end",
                        background: "var(--primary-blue)",
                      }
                    : { justifyContent: "flex-start" }
                }
              >
                <div
                  className={styles.circle}
                  style={
                    darkMode
                      ? { background: "var(--white-bg)" }
                      : { background: " var(--seconday-bg-gray)" }
                  }
                ></div>
              </div>
              <div className={styles.pvCardtext}>
                <h3>Dark mode </h3>
                <p>protect ur eyes form harmfull colors</p>
              </div>
            </div>
          
         
          </div>
        </div>
      </div>
    </div>
  );
}
