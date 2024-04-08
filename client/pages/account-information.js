import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import useUserDetails from '../components/useUserDetails';

function AccountInformation() {
  const [user, loading] = useAuthState(auth);
  const { userDetails, error } = useUserDetails();

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (!user) {
    return <div style={styles.message}>Please log in to view your account information.</div>;
  }

  if (error) {
    return <div style={{ ...styles.message, color: 'red' }}>Error: {error}</div>;
  }

  if (!userDetails) {
    return <div style={styles.message}>User details not available.</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Account Information</h1>
      <div style={styles.infoContainer}>
        <div style={styles.textBox}>
          <div style={styles.infoItem}>
            <span style={styles.label}>Full Name:</span>
            <span style={styles.value}>{userDetails.fullName ? userDetails.fullName : 'N/A'}</span>
          </div>
        </div>
        <div style={styles.textBox}>
          <div style={styles.infoItem}>
            <span style={styles.label}>Email:</span>
            <span style={styles.value}>{userDetails.email ? userDetails.email : 'N/A'}</span>
          </div>
        </div>
        {/* Add other user details here */}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '4px',
  },
  heading: {
    fontSize: '40px',
    marginBottom: '20px',
  },
  infoContainer: {
    marginTop: '20px',
  },
  infoItem: {
    marginBottom: '10px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  value: {
    color: '#888',
  },
  loading: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
  },
  message: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '18px',
  },
  textBox: {
    border: '1px solid #ccc',
    borderRadius: '20px',
    padding: '8px',
  },
};

export default AccountInformation;
