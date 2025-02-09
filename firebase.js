import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyANqGfcWSR4PvHy1AuZQT6KputkFcr4Z4I",
  authDomain: "notes-app-6149d.firebaseapp.com",
  projectId: "notes-app-6149d",
  storageBucket: "notes-app-6149d.appspot.com",
  messagingSenderId: "201464492290",
  appId: "1:201464492290:web:96ba9b9c1b9babeb40d21b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
};

const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
};

const logout = async () => {
    await signOut(auth);
    window.location.href = "login.html";
};

export { auth, db, signUp, login, logout };
