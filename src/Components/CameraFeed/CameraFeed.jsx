import React, { useState } from "react";
import "./CameraFeed.css";

const CameraFeed = () => {
  const ipCameraUrl = 'https://192.168.1.3:4343/video';
  const [isCameraOn, setIsCameraOn] = useState(false);

  return (
    <div className="camera-section">
      <div className="camera-controls">
        <label className="camera-switch">
          <input 
            type="checkbox" 
            checked={isCameraOn}
            onChange={() => setIsCameraOn(!isCameraOn)}
          />
          <span className="slider round"></span>
        </label>
        <span className="camera-status">
          {isCameraOn ? 'Camera ON' : 'Camera OFF'}
        </span>
      </div>

      {isCameraOn ? (
        <div className="camera-container">
          {/* Use iframe or img based on what works */}
          <img
            src={ipCameraUrl}
            alt="Camera Feed"
            className="camera-feed"
          />
        </div>
      ) : (
        <div className="camera-off-placeholder">
          <div className="placeholder-icon">📷</div>
          <p>Camera feed is turned off</p>
        </div>
      )}
    </div>
  );
};


export default CameraFeed;
