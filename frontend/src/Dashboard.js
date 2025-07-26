// src/Dashboard.js
import React, { useEffect, useState } from "react";
import db from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import "./App.css";

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "alerts"), (snapshot) => {
      const alertData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlerts(alertData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="dashboard">
      <h1>🛡️ Crowd Safety Alerts</h1>
      <table>
        <thead>
          <tr>
            <th>Location</th>
            <th>Risk Level</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td>{alert.location}</td>
              <td>{alert.riskLevel}</td>
              <td>{new Date(alert.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
