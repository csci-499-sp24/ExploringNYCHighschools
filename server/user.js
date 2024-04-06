// user.js

const express = require('express');
const router = express.Router();
const { auth } = require('./firebase/firebaseConfig');

// Define a route to fetch user details
router.get('/api/user', async (req, res) => {
  try {
    // Get the ID token from the request headers
    const authorizationHeader = req.headers.authorization;
    
    // Check if the authorization header is provided
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Authorization header is missing' });
    }

    const idToken = authorizationHeader.split(' ')[1];

    // Verify the ID token
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Fetch user details from Firebase Authentication
    const userRecord = await auth.getUser(uid);
    const userDetails = {
      fullName: userRecord.displayName,
      email: userRecord.email,
      // Add more user details as needed
    };

    // Send the user details in the response
    res.json(userDetails);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
