/* Fully updated script.js */
import { login as firebaseLogin, signUp, logout } from "./firebase.js";
import { auth, db } from "./firebase.js";
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { loadNotes } from "./dashboard.js";

let smail = document.getElementById("signup-email");
let spass = document.getElementById("signup-password");
let cpass = document.getElementById("confirm-password");
let serror = document.getElementById("signup-error");
let lmail = document.getElementById("login-email");
let lpass = document.getElementById("login-password");
let lerror = document.getElementById("login-error");
let signUpButton = document.getElementById("signUpButton");
let loginButton = document.getElementById("loginButton");
loginButton?.addEventListener("click", validateAndLogin);

function validateAndRedirectSignup() {
    serror.innerText = "";
    let errorMessage = "";

    if (!smail.value) {
        errorMessage += "Email cannot be empty.\n";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smail.value)) {
        errorMessage += "Enter a valid email address.\n";
    }

    if (!spass.value || spass.value.length < 6) {
        errorMessage += "Password must be at least 6 characters long.\n";
    }

    if (cpass.value !== spass.value) {
        errorMessage += "Passwords do not match.\n";
    }

    if (errorMessage) {
        serror.innerText = errorMessage;
        return;
    }

    signUpButton.disabled = true;
    signUp(smail.value, spass.value).catch((error) => {
        serror.innerText = error.message;
        signUpButton.disabled = false;
    });
}

function validateAndLogin() {
    let errorMessage = "";

    if (!lmail.value.trim()) {
        errorMessage += "Email cannot be empty.\n";
    }
    if (!lpass.value.trim()) {
        errorMessage += "Password cannot be empty.\n";
    }

    if (errorMessage) {
        lerror.innerText = errorMessage;
        return;
    }
    firebaseLogin(lmail.value, lpass.value);
}

auth.onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = "login.html";
    } else {
        document.getElementById("welcomeMessage").innerText = `Welcome, ${user.email}!`;
        loadNotes();
    }
});
