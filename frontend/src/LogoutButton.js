// src/LogoutButton.js
import React from "react";
import { getAuth, signOut } from "firebase/auth";

function LogoutButton() {
  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return <button onClick={handleLogout}>🚪 Logout</button>;
}

export default LogoutButton;
