import React from 'react'

export default function Controll() {
  return (
    <div>
      <h1>Servo Motor Control</h1>
    <h2>Current Angle: <span id="angle-display">0</span>°</h2>
    
    <input type="range" id="angle-slider" min="0" max="180" value="0" />
    <br/>
    <button >Set Angle</button>

    </div>
  )
}
