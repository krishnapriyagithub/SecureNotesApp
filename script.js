let smail=document.getElementById("signup-email");
let spass=document.getElementById("signup-password");
let serror=document.getElementById("signup-error");
let cpass=document.getElementById("confirm-password");
let lmail=document.getElementById("login-email");
let lpass=document.getElementById("login-password");
let lerror=document.getElementById("login-error");
let signUpButton = document.getElementById("signup-button");


function signUp(email,password)
{
    signUpButton.disabled=true;

    createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) =>{
        let user=userCredential.user;
        console.log("User signed up:",user);
        localStorage.setItem("userID",user.uid)
        window.location.href="dashboard.html";
      })

      .catch((error) =>{
        let errorMessage = "";
            if (error.code === "auth/email-already-in-use") {
                errorMessage = "Email is already registered.";
            } else if (error.code === "auth/invalid-email") {
                errorMessage = "Enter a valid email address.";
            } else if (error.code === "auth/weak-password") {
                errorMessage = "Password should be at least 6 characters.";
            } else {
                errorMessage = error.message; // Other Firebase errors
            }
            serror.innerText = errorMessage;
            signUpButton.disabled = false;
      })
}
serror.innerText = "";

function ValidateAndRedirectSignup(){
let errorMessage=""
if(smail.value==="")
{
    errorMessage += "Email cannot be empty \n";
}

else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(smail.value)) {
    errorMessage += "Enter a valid email address \n";
}

if(spass.value==="")
{
    errorMessage += "Password cannot be empty \n";
}

else if(spass.value.length<6)
{
    errorMessage += "Password must contain atleast 6 charcaters \n";

}
if(cpass.value!==spass.value)
{
   errorMessage += "Passwords Do Not Match \n";
}

if(errorMessage!=""){
    serror.innerText=errorMessage;
    serror.innerHTML = errorMessage.replace(/\n/g, "<br>");
}
    else{
        signUp(smail.value,spass.value);
    }
}

smail.oninput=()=>{serror.innerText="";};
spass.oninput=()=>{serror.innerText="";};
cpass.oninput=()=>{serror.innerText="";};
