// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk-PmjHTpqOqkLHhxSvXIIYuI5gmyuLsc",
  authDomain: "crowdsafetyagent.firebaseapp.com",
  projectId: "crowdsafetyagent",
  storageBucket: "crowdsafetyagent.appspot.com",
  messagingSenderId: "857942670604",
  appId: "1:857942670604:web:287e165ba3b86ec1b69d29",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db };
