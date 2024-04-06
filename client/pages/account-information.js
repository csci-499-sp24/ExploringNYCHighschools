// AccountInformation.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import useUserDetails from '../components/useUserDetails';

function AccountInformation() {
  const [user, loading] = useAuthState(auth);
  const { userDetails, error } = useUserDetails();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your account information.</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Check if userDetails exists before accessing its properties
  if (!userDetails) {
    return <div>User details not available.</div>;
  }

  return (
    <div>
      <h1>Account Information</h1>
      <div>
        {/* Check if userDetails.fullName exists before rendering */}
        <p>Full Name: {userDetails.fullName ? userDetails.fullName : 'N/A'}</p>
        {/* Check if userDetails.email exists before rendering */}
        <p>Email: {userDetails.email ? userDetails.email : 'N/A'}</p>
        {/* Display other user details */}
      </div>
    </div>
  );
}

export default AccountInformation;
