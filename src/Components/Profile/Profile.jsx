import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css"; // Import the CSS file

export default function Profile({ currentUser }) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = localStorage.getItem("token");
        console.log("Token found:", token); // Debugging

        if (!token) {
          console.warn("No token found");
          return;
        }

        const { data } = await axios.get(
          "https://graduation-project-backend-rhwo.vercel.app/user/profile",
          {
            headers: { accesstoken: token },
          }
        );

        console.log("Profile Data:", data); // Debugging
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error.response?.data || error);
      }
    }

    fetchProfile();
  }, []);

  if (!profileData) {
    return <div className="loading">Loading profile...</div>;
  }

  const { userName, email, phone, profilePic } = profileData.user;

  // Default profile picture
  const defaultPic =
    "https://www.w3schools.com/howto/img_avatar.png"; // Change this to any default avatar URL

  return (
    <div className="profile-container">
      <h2 className="welcome-message">Welcome, {userName}!</h2>

      {/* Profile Picture Section */}
      <div className="profile-pic-container">
        <img
          src={profilePic || defaultPic} // Use default pic if profilePic is missing
          alt="Profile"
          className="profile-pic"
        />
      </div>

      <div className="profile-details">
        <div className="profile-item">
          <span className="label">Username:</span>
          <span className="value">{userName}</span>
        </div>
        <div className="profile-item">
          <span className="label">Email:</span>
          <span className="value">{email}</span>
        </div>
        <div className="profile-item">
          <span className="label">Phone:</span>
          <span className="value">{phone}</span>
        </div>
      </div>
    </div>
  );
}
