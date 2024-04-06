import { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/firebase';

const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null); // Add an error state to capture any errors

  useEffect(() => {
    const fetchUserDetails = async () => {
      // Ensure there's a current user before proceeding
      if (!auth.currentUser) {
        setError('No user is currently signed in.');
        setUserDetails(null);
        return;
      }

      try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get('http://localhost:8080/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log("Response headers:", response.headers);

        setUserDetails(response.data.userDetails);
        setError(null); // Reset error state on successful fetch
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message); // Update error state to provide feedback
        setUserDetails(null);
      }
    };

    fetchUserDetails();
  }, [auth.currentUser]); // Dependency array ensures effect runs on change to auth.currentUser

  return { userDetails, error }; // Return both userDetails and error for consumer components to use
};

export default useUserDetails;
