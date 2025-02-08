import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

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
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};

// 🔹 Function to Log In a User
const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error logging in:", error.message);
  }
};

// 🔹 Function to Log Out a User
const logout = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error.message);
  }
};

// 🔹 Function to Add a New Note to Firestore
const addNote = async (userId, noteText) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), {
      userId: userId,  // Associate note with the user
      text: noteText,
      timestamp: new Date()
    });
    console.log("Note added with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding note:", error.message);
  }
};

// 🔹 Function to Get All Notes of a User
const getNotes = async (userId) => {
  try {
    const querySnapshot = await getDocs(collection(db, "notes"));
    const notes = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().userId === userId) {
        notes.push({ id: doc.id, ...doc.data() });
      }
    });
    return notes;
  } catch (error) {
    console.error("Error fetching notes:", error.message);
  }
};

export { auth, db, signUp, login, logout, addNote, getNotes };
