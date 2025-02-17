import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

export default function Dashboard() {
  const [drowsinessStatus, setDrowsinessStatus] = useState('Awake'); // Default status is 'Awake'
  const [trafficSpeed, setTrafficSpeed] = useState(null); // Default traffic speed is null

  // Function to fetch both traffic speed and driver status
  const fetchData = () => {
    axios
      .get('https://graduation-project-backend-rhwo.vercel.app/speed/get-speed')
      .then((response) => {
        setTrafficSpeed(response.data.trafficSpeed); // Set traffic speed
      })
      .catch((error) => {
        console.error('Error fetching traffic speed:', error);
      });

    axios
      .get('https://graduation-project-backend-rhwo.vercel.app/status/get-status')
      .then((response) => {
        setDrowsinessStatus(response.data.statusOfDriver.status); // Set driver status (awake/drowsy)
      })
      .catch((error) => {
        console.error('Error fetching driver status:', error);
      });
  };

  // UseEffect to call the APIs initially and set the interval for repeated calls every 10 seconds
  useEffect(() => {
    fetchData(); // Initial fetch on mount

    const interval = setInterval(() => {
      fetchData(); // Re-fetch every 10 seconds
    }, 10000); // 10 seconds = 10000 milliseconds

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="dashboard">
      {/* First Row: Drowsiness Status and Traffic Speed Boxes */}
      <div className="row">
        {/* Drowsiness Status Box */}
        <div className="box status-box">
          <h2 className='fw-bold'>Driver Status</h2>
          <p className={drowsinessStatus.toUpperCase()}>{drowsinessStatus.toUpperCase()}</p>
        </div>

        {/* Traffic Speed Box */}
        <div className="box traffic-box">
        <h2 className='fw-bold'>Traffic Speed</h2>
          <p>{trafficSpeed !== null ? `${trafficSpeed} km/h` : 'Loading...'}</p>
        </div>
      </div>

      <div className='parent'>
        {/* Second Row: Google Maps Box */}
      <div className="box maps-box">
      <h2 className='fw-bold'>Google Maps</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d27641.608998877786!2d31.1394304!3d30.002380799999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2seg!4v1739757159769!5m2!1sen!2seg"
          width="100%"
          height="400"
          style={{ border: '0' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      </div>
    </div>
  );
}
