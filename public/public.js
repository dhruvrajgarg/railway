// public.js
const statusElement = document.getElementById('status');
const lastUpdatedElement = document.getElementById('last-updated');
const bodyElement = document.body;

// Paste your Firebase configuration here
const firebaseConfig = {
    apiKey: "AIzaSyC3qG4Q2lup2Sw8mTo_JgRTB7ncoZleQrk",
    authDomain: "railway-crossing.firebaseapp.com",
    databaseURL: "https://railway-crossing-default-rtdb.firebaseio.com",
    projectId: "railway-crossing",
    storageBucket: "railway-crossing.appspot.com",
    messagingSenderId: "286088255001",
    appId: "1:286088255001:web:55bc9f963f66a29ae2bc88",
    measurementId: "G-ZBSG8M4ZNF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();

// Listen for changes to the status
database.ref('status').on('value', (snapshot) => {
  const status = snapshot.val();
  statusElement.textContent = `The barrier is ${status}`;
  bodyElement.className = status;
  lastUpdatedElement.textContent = `Last updated: ${new Date().toLocaleTimeString()}`;
});