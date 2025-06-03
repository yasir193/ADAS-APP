import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

export default function Profile({ currentUser }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await axios.get(
          "https://graduation-project-backend-rhwo.vercel.app/user/profile",
          {
            headers: { accesstoken: token },
          }
        );

        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      }
    }

    fetchProfile();
  }, []);

  if (!profileData) {
    return <div className={styles.loading}>Loading profile...</div>;
  }

  const { userName, email, phone, profilePic } = profileData.user;

  const defaultPic = "https://www.w3schools.com/howto/img_avatar.png";

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileContainer}>
        <h2 className={styles.welcomeMessage }>Welcome, {userName}!</h2>

        <div className={styles.profilePicContainer}>
          <img
            src={profilePic || defaultPic}
            alt="Profile"
            className={styles.profilePic}
          />
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.profileItem}>
            <span className={styles.label}>Username:</span>
            <span className={styles.value}>{userName}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{email}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
