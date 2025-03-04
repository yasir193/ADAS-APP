import React, { useState } from 'react';
import './Control.css';

export default function Control() {
  const [servoAngle, setServoAngle] = useState(90); // Default servo angle at 90°

  // Handle Servo Motor Control
  const moveServo = (direction) => {
    let newAngle = direction === 'left' ? servoAngle - 1 : servoAngle + 1;
    newAngle = Math.max(0, Math.min(180, newAngle)); // Ensure angle stays within 0-180°
    setServoAngle(newAngle);
    console.log(`Servo moved ${direction}. New Angle: ${newAngle}`);
    // Here, you can send this newAngle to your backend via an API request.
  };

  // Handle DC Motor Control
  const moveMotor = (direction) => {
    console.log(`Moving DC Motor: ${direction}`);
    // Send command to backend (API request)
  };

  return (
    <div className="control-container">
      {/* DC Motor Controls */}
      <h2>DC Motor Control</h2>
      <div className="motor-controls">
        <button onClick={() => moveMotor('forward')}>⬆</button>
        <div className="side-buttons">
          <button onClick={() => moveMotor('left')}>⬅</button>
          <button onClick={() => moveMotor('right')}>➡</button>
        </div>
        <button onClick={() => moveMotor('backward')}>⬇</button>
      </div>

      {/* Servo Motor Controls */}
      <h2>Servo Motor Control</h2>
      <p>Current Angle: {servoAngle}°</p>
      <div className="servo-controls">
        <button onClick={() => moveServo('left')}>⬅</button>
        <button onClick={() => moveServo('right')}>➡</button>
      </div>
    </div>
  );
}
