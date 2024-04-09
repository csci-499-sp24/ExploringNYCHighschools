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
    <div className="background-color" style={styles.backgroundContainer}>
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
        <footer style={styles.footer}>
          {/* Add footer content here */}
        </footer>
      </div>
    </div>
  );
}

const styles = {
  backgroundContainer: {
    minHeight: '100vh',
    color: '#333',
  },
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '4px',
    minHeight: 'calc(100vh - 60px)', // Adjusted to fit the page minus the navbar height
    display: 'flex',
    flexDirection: 'column',
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
    color: 'black', // Changed label color to white
  },
  value: {
    color: 'black', // Changed value color to white
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
    border: '1px solid #000', // Changed text field border color to white
    borderRadius: '20px',
    padding: '8px',
    marginBottom: '15px', // Added margin bottom to create space between text fields
  },
  footer: {
    marginTop: 'auto',
    padding: '20px',
    background: '#f0f0f0',
    textAlign: 'center',
    width: '100%',
  },
};

export default AccountInformation;