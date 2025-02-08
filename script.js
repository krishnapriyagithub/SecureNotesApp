import { login as firebaseLogin, signUp, logout } from "./firebase.js";



let smail = document.getElementById("signup-email");
let spass = document.getElementById("signup-password");
let cpass = document.getElementById("confirm-password");
let serror = document.getElementById("signup-error");
let lmail = document.getElementById("login-email");
let lpass = document.getElementById("login-password");
let lerror = document.getElementById("login-error");
let signUpButton = document.getElementById("signUpButton");
let loginButton=document.getElementById("loginButton");
loginButton.addEventListener("click", validateAndLogin);


// Function to handle Sign Up Validation
function ValidateAndRedirectSignup() {
    serror.innerText = "";  // Clear previous errors
    let errorMessage = "";

    if (!smail.value) {
        errorMessage += "Email cannot be empty.<br>";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smail.value)) {
        errorMessage += "Enter a valid email address.<br>";
    }

    if (!spass.value) {
        errorMessage += "Password cannot be empty.<br>";
    } else if (spass.value.length < 6) {
        errorMessage += "Password must contain at least 6 characters.<br>";
    }

    if (cpass.value !== spass.value) {
        errorMessage += "Passwords do not match.<br>";
    }

    if (errorMessage) {
        serror.innerHTML = errorMessage;
        return;
    }

    // Disable button to prevent multiple clicks
    signUpButton.disabled = true;

    // Call Firebase sign-up function
    signUp(smail.value, spass.value)
        .catch((error) => {
            let message = error.message;
            if (error.code === "auth/email-already-in-use") {
                message = "Email is already registered.";
            } else if (error.code === "auth/invalid-email") {
                message = "Enter a valid email address.";
            } else if (error.code === "auth/weak-password") {
                message = "Password should be at least 6 characters.";
            }
            serror.innerHTML = message;
            signUpButton.disabled = false;  // Re-enable the button
        });
}

// Function to handle Log In
function validateAndLogin() {
    let errorMessage = "";

    // 🚨 Validate Email
    if (lmail.value.trim() === "") {
        errorMessage += "Email cannot be empty.\n";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lmail.value)) {
        errorMessage += "Enter a valid email address.\n";
    }

    // 🚨 Validate Password
    if (lpass.value.trim() === "") {
        errorMessage += "Password cannot be empty.\n";
    }

    // ❌ If any error exists, display it and return
    if (errorMessage !== "") {
        lerror.innerHTML = errorMessage.replace(/\n/g, "<br>"); // Show errors
        return;
    }

    // ✅ If no errors, call Firebase login function (renamed)
    firebaseLogin(lmail.value, lpass.value);
}



// Event Listeners
document.addEventListener("DOMContentLoaded", function () {
    if (signUpButton) {
        signUpButton.addEventListener("click", ValidateAndRedirectSignup);
    }
    document.querySelector("input[value='Log In']").addEventListener("click", ValidateAndLogin);
});
