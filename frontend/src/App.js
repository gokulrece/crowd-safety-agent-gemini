// src/App.js
import React, { useEffect, useState } from "react";
import { db } from "./firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import LogoutButton from "./LogoutButton";
import "./App.css";

function App() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [riskFilter, setRiskFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "alerts"), (snapshot) => {
      const fetchedAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAlerts(fetchedAlerts);
      setLocations([...new Set(fetchedAlerts.map(a => a.location))]);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    const filtered = alerts.filter(alert => {
      const riskMatch = riskFilter === "All" || alert.riskLevel === riskFilter;
      const locationMatch = locationFilter === "All" || alert.location === locationFilter;
      return riskMatch && locationMatch;
    });
    setFilteredAlerts(filtered);
  }, [alerts, riskFilter, locationFilter]);

  if (!user) return <Login onLogin={() => {}} />;

  return (
    <div className="app-container">
      <header>
        <h1>🛡️ Crowd Safety Dashboard</h1>
        <LogoutButton />
      </header>

      <div className="filters">
        <label>Risk Level:</label>
        <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <label>Location:</label>
        <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
          <option>All</option>
          {locations.map(loc => (
            <option key={loc}>{loc}</option>
          ))}
        </select>
      </div>

      <div className="alert-list">
        {filteredAlerts.map(alert => (
          <div key={alert.id} className={`alert-card ${alert.riskLevel.toLowerCase()}`}>
            <h3>{alert.location}</h3>
            <p><strong>Risk:</strong> {alert.riskLevel}</p>
            <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
            {alert.recommendation && <p><strong>AI Suggestion:</strong> {alert.recommendation}</p>}
          </div>
        ))}
        {filteredAlerts.length === 0 && <p>No alerts found for selected filters.</p>}
      </div>
    </div>
  );
}

export default App;
