import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/athContext";
import SideBar from "../../layout/sideBar/SideBar";
import styles from "./profilePrivcay.module.css";
import { usePfData } from "../../../contexts/profileContext";
import { useLoader } from "../../../contexts/loaderContext";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
export default function ProfilePrivacy(props) {
  const [auth, setAth] = useAuth();
  const [pfData, setPfData] = usePfData();

  const [pvOptions, setPvOptions] = useState(null);

  const [loading , setLoading] = useLoader(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    if (auth?.user.privacy) {
      setPvOptions(auth.user.privacy);
    }
  }, [auth]);
  //            privacy: {
  //     showEmail: { type: Boolean, default: true },
  //     showNumber: { type: Boolean, default: false },
  //     shareData: { type: Boolean, default: false }
  // }
  const submitPrivacy = async () => {
      try {
        setLoading(true);
        let res =await api.put(
        "/menu/profile/privacy",
        {
          privacyOptions: pvOptions,
        },
        {
          headers: {
            authorization: "Bearer " + auth.token,
          },
        }
      );
      console.log(res)
      navigate(0)
      setLoading(false);
    } catch (error) {
        navigate(0)
        setLoading(false);
        console.log(error);
    }
  };

  const toggleEmail = () => {
    let val = pvOptions.showEmail ? false : true;
    setPvOptions((prev) => {
      return { ...pvOptions, showEmail: val };
    });
  };
  const toggleNumber = () => {
    let val = pvOptions.showNumber ? false : true;
    setPvOptions((prev) => {
      return { ...pvOptions, showNumber: val };
    });
  };
  const toggleData = () => {
    let val = pvOptions.showData ? false : true;
    setPvOptions((prev) => {
      return { ...pvOptions, showData: val };
    });
  };

  return (
    <div className={styles.ProfilePreviewContainer}>
      <SideBar></SideBar>
      <div className={styles.contentArea}>
        <div className={styles.Header}>
          <h1>Privacy</h1>
          <p>manage ur privacy...</p>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.privacyHolder}>
            <div className={styles.pvCard}>
              <div
                className={styles.toggleButton}
                onClick={toggleEmail}
                style={
                  pvOptions?.showEmail
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
                    pvOptions?.showEmail
                      ? { background: "var(--white-bg)" }
                      : { background: " var(--seconday-bg-gray)" }
                  }
                ></div>
              </div>
              <div className={styles.pvCardtext}>
                <h3>show email</h3>
                <p>let people see ur email</p>
              </div>
            </div>
            <div className={styles.pvCard}>
              <div
                className={styles.toggleButton}
                onClick={toggleNumber}
                style={
                  pvOptions?.showNumber
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
                    pvOptions?.sh
                      ? { background: "var(--white-bg)" }
                      : { background: " var(--seconday-bg-gray)" }
                  }
                ></div>
              </div>
              <div className={styles.pvCardtext}>
                <h3>show number</h3>
                <p>let people see ur phone number</p>
              </div>
            </div>
            <div className={styles.pvCard}>
              <div
                className={styles.toggleButton}
                onClick={toggleData}
                style={
                  pvOptions?.showData
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
                    pvOptions?.showData
                      ? { background: "var(--white-bg)" }
                      : { background: " var(--seconday-bg-gray)" }
                  }
                ></div>
              </div>
              <div className={styles.pvCardtext}>
                <h3>share ur data with nrigram</h3>
                <p>help us to improver our user experience </p>
              </div>
            </div>
          <button className={styles.submitButton} onClick={submitPrivacy}>
            Submit
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
