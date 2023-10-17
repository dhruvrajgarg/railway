// server.js
const express = require('express');
const admin = require('firebase-admin');
const app = express();

app.use(express.static('public'));
app.use(express.text());

// Paste your Firebase configuration here
const serviceAccount = require('./public/keys/railway-crossing-firebase-adminsdk-uk799-c0ba9b9b55.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://railway-crossing-default-rtdb.firebaseio.com"
});

// Get a reference to the database service
const database = admin.database();

app.post('/status', (req, res) => {
  const status = req.body;

  // Update the status in the database
  database.ref('status').set(status, (error) => {
    if (error) {
      console.error(`Failed to update status: ${error}`);
      res.status(500).send(error);
    } else {
      console.log(`Updated status to: ${status}`);
      res.end();
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));