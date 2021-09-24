var firebaseConfig = {
    apiKey: "AIzaSyAEaulieiixPWSB_O96p3aWMyxuI_sRBKE",
    authDomain: "ltgrouting.firebaseapp.com",
    projectId: "ltgrouting",
    storageBucket: "ltgrouting.appspot.com",
    messagingSenderId: "244666722335",
    appId: "1:244666722335:web:e35d2952f1c31091930d2a",
    measurementId: "G-Z901D1ZJ85"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signupfun() {
    var email = document.getElementById("emailid");
    var password = document.getElementById("passwordnew");
    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    console.log("Signed Up " + email.value);
};

function signinfun() {
    var email = document.getElementById("signinemail");
    var password = document.getElementById("signinpassword");
    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

};

function signoutfun() {
    auth.signOut();
    console.log("Signed Out");
};

auth.onAuthStateChanged(function(user) {
    if(user){
        var email = user.email;
        console.log("Active user: "+email);
        window.location = '/components/route/route.html';
    }else {
        console.log("No Active user");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#sign-in-form");
    const signupForm = document.querySelector("#sign-up-form");

    document.querySelector("#linkSignUp").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        signupForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        signupForm.classList.add("form--hidden");
    });
});