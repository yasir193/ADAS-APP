import React, { useState, useEffect, useRef } from "react";
import styles from "./Dashboard.module.css"; // Import styles (you can define your own)
import { Line } from "react-chartjs-2"; // For line chart (speed, etc.)
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // For map display
import { FaExclamationTriangle } from "react-icons/fa"; // For alert icon
import Chart from "chart.js/auto"; // Import Chart.js

// Sample data for speed and sensors (this should be dynamic in real applications)
const sampleData = {
  speed: [60, 65, 70, 75, 80, 85, 90], // Speed data over time
  alert: "None", // Currently no alert
  vehiclePosition: { lat: 40.73061, lng: -73.935242 }, // Example coordinates (New York)
};

const Dashboard = () => {
  const [speedData, setSpeedData] = useState(sampleData.speed);
  const [alert, setAlert] = useState(sampleData.alert);
  const [position, setPosition] = useState(sampleData.vehiclePosition);
  const chartRef = useRef(null); // Ref to store chart instance

  // Simulate real-time data (in a real app, this would come from your sensors/APIs)
  useEffect(() => {
    const interval = setInterval(() => {
      // Update speed data
      setSpeedData((prevData) => [...prevData, Math.floor(Math.random() * 100 + 60)]);
      
      // Randomly set alert
      setAlert(Math.random() > 0.8 ? "Collision Warning!" : "None");
      
      // Update vehicle position
      setPosition((prevPosition) => ({
        lat: prevPosition.lat + 0.001, 
        lng: prevPosition.lng + 0.001,
      }));
    }, 3000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Empty dependency array to prevent reruns when only position updates

  // Chart options for speed over time
  const speedChartOptions = {
    labels: speedData.map((_, index) => index + 1),
    datasets: [
      {
        label: "Speed (km/h)",
        data: speedData,
        fill: false,
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  // Cleanup chart when component unmounts or before re-render
  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance; // Access the chart instance
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }
    }
  }, [speedData]); // Re-run cleanup if speedData changes

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>ADAS Dashboard</h1>
      
      {/* Speed chart */}
      <div className={styles.chart}>
        <h2>Vehicle Speed</h2>
        <Line data={speedChartOptions} ref={chartRef} /> {/* Assign ref to Line chart */}
      </div>

      {/* Alerts */}
      {alert !== "None" && (
        <div className={styles.alert}>
          <FaExclamationTriangle size={30} color="red" />
          <span>{alert}</span>
        </div>
      )}

      {/* Map Display */}
      <div className={styles.map}>
        <h2>Vehicle Location</h2>
        <MapContainer center={position} zoom={13} style={{ height: "300px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>Your vehicle's location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
