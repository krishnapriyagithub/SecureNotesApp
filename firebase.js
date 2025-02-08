import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANqGfcWSR4PvHy1AuZQT6KputkFcr4Z4I",
  authDomain: "notes-app-6149d.firebaseapp.com",
  projectId: "notes-app-6149d",
  storageBucket: "notes-app-6149d.appspot.com",
  messagingSenderId: "201464492290",
  appId: "1:201464492290:web:96ba9b9c1b9babeb40d21b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Function to Sign Up a New User
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User signed up:", userCredential.user);
    localStorage.setItem("userID", userCredential.user.uid);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Error signing up:", error.message);
    throw error;  // Pass error to script.js
  }
};

// 🔹 Function to Log In a User
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    localStorage.setItem("userID", userCredential.user.uid);
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// 🔹 Function to Log Out a User
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
    localStorage.removeItem("userID");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

export { auth, db, signUp, login, logout };
