import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./Dashboard.module.css";
import CameraFeed from "../CameraFeed/CameraFeed";

export default function Dashboard() {
  const [drowsinessStatus, setDrowsinessStatus] = useState("Awake");
  const [trafficSpeed, setTrafficSpeed] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const audioRef = useRef(null);
  const [gpsCoords, setGpsCoords] = useState({
    latitude: 30.0023807,
    longitude: 31.1394304,
  }); // default fallback

  useEffect(() => {
    const fetchGPS = () => {
      axios
        .get("https://graduation-project-backend-rhwo.vercel.app/gps/get-gps")
        .then((res) => {
          const { latitude, longitude } = res.data;
          if (latitude && longitude) {
            setGpsCoords({ latitude, longitude });
          }
        })
        .catch((err) => {
          console.error("Error fetching GPS coordinates:", err);
        });
    };

    fetchGPS(); // initial fetch
    const interval = setInterval(fetchGPS, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(
      "/sounds/alarm-police-fire-ambulance-etc-sound-effect-26-11504.mp3"
    );
    audioRef.current.loop = true;

    // Handle user interaction to enable audio
    const handleInteraction = () => {
      setUserInteracted(true);
      // Play/pause quickly to unlock audio (won't actually play)
      audioRef.current.play().catch((e) => console.log("Audio pre-unlock:", e));
      audioRef.current.pause();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Fetch data
  const fetchData = () => {
    axios
      .get("https://graduation-project-backend-rhwo.vercel.app/speed/get-speed")
      .then((response) => setTrafficSpeed(response.data.trafficSpeed))
      .catch((error) => console.error("Error fetching traffic speed:", error));

    axios
      .get(
        "https://graduation-project-backend-rhwo.vercel.app/status/get-status"
      )
      .then((response) =>
        setDrowsinessStatus(response.data.statusOfDriver.status)
      )
      .catch((error) => console.error("Error fetching driver status:", error));
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // Handle sound based on drowsiness status
  useEffect(() => {
    if (!audioRef.current || !userInteracted) return;

    const handleAudio = async () => {
      try {
        if (drowsinessStatus.toUpperCase() === "DROWSINESS") {
          await audioRef.current.play();
          console.log("Alarm playing");
        } else {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      } catch (error) {
        console.error("Audio error:", error);
        // Show a message to the user to interact with the page
        if (error.name === "NotAllowedError") {
          alert("Please click/tap anywhere on the page to enable alarm sounds");
        }
      }
    };

    handleAudio();
  }, [drowsinessStatus, userInteracted]);

  return (
    <div
      className={`${styles.dashboard} ${
        isMobile ? styles.dashboardMobile : styles.dashboardDesktop
      }`}
      onClick={() => setUserInteracted(true)} // Additional interaction handler
    >
      {/* First Row: Status Boxes */}
      <div className={styles.statusRow}>
        <div className={styles.statusBox}>
          <h2 className="text-white">Driver Status</h2>
          <p className={styles[drowsinessStatus.toUpperCase()]}>
            {drowsinessStatus.toUpperCase() === "DROWSINESS"
              ? "DROWSY"
              : drowsinessStatus.toUpperCase()}
          </p>
        </div>

        <div className={styles.trafficBox}>
          <h2 className="text-white">Traffic Speed</h2>
          <p className="fw-bold">
            {trafficSpeed !== null ? `${trafficSpeed} km/h` : "Loading..."}
          </p>
        </div>
      </div>

      <div className={styles.mapsCameraContainer}>
        <div className={styles.mapsBox}>
          <h2 className="text-white">Live Tracker</h2>
          <iframe
            key={`${gpsCoords.latitude},${gpsCoords.longitude}`} // forces iframe reload
            src={`https://maps.google.com/maps?q=${gpsCoords.latitude},${gpsCoords.longitude}&z=15&output=embed`}
            width="100%"
            height="100%"
            style={{ border: "0" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className={styles.cameraBox}>
          <h2 className="text-white">Live Camera Feed</h2>
          <CameraFeed />
        </div>
      </div>

      {/* Audio permission indicator (hidden unless needed) */}
      {!userInteracted && (
        <div className={styles.audioPermission}>
          <p>Click anywhere to enable alarm sounds</p>
        </div>
      )}
    </div>
  );
}
