// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startSRVP');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
// var firebaseConfig = {};
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyB0dM3IahfR3d0Ne-B1K92IW8T7t9ObAaA",
    authDomain: "fir-codelab-9f110.firebaseapp.com",
    databaseURL: "https://fir-codelab-9f110.firebaseio.com",
    projectId: "fir-codelab-9f110",
    storageBucket: "fir-codelab-9f110.appspot.com",
    messagingSenderId: "640874240637",
    appId: "1:640874240637:web:104e5f6f88e78c2849ef14"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRsvpButton.addEventListener("click", ()=>{
  if (firebase.auth().currentUser){
    firebase.auth().signOut();
  }else{
    ui.start("#firebaseui-auth-container", uiConfig);
  }
  
});



firebase.auth().onAuthStateChanged((user)=>{
 if(user){
   startRsvpButton.textContent = "LOGOUT"
   guestbookContainer.style.display="block";
 }else{
   startRsvpButton.textContent = "RSVP"
   guestbookContainer.style.display="none";
 }
});

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  firebase.firestore().collection("guestbook").add({
    text: input.value, 
    timestamp: Date.now(),
    name: firebase.auth().currentUser.uid


  });
  input.value=null;
  return false;
})