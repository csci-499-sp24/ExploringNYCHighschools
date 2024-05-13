import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
import useUserDetails from '../components/useUserDetails';
import Link from 'next/link';

function AccountInformation() {
  const [user, loading] = useAuthState(auth);
  const { userDetails, error } = useUserDetails();

  const styles = {
    backgroundContainer: {
      minHeight: '70vh',
      color: '#333',
    },
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      borderRadius: '4px',
      minHeight: '70vh',
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
      color: 'black',
    },
    value: {
      color: 'black',
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
      border: '1px solid #000',
      borderRadius: '20px',
      padding: '8px',
      marginBottom: '15px',
    },
    addressBox: {
      position: 'relative', 
      border: '1px solid #000',
      borderRadius: '20px',
      padding: '8px',
      marginBottom: '15px',
    },
    addressItem: {
      marginBottom: '5px',
    },
    footer: {
      marginTop: 'auto',
      padding: '20px',
      background: '#f0f0f0',
      textAlign: 'center',
      width: '100%',
    },
    editButton: {
      position: 'absolute', 
      top: '-3px', 
      right: '10px', 
      padding: '8px 16px',
      backgroundColor: 'transparent', 
      color: '#007bff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'color 0.3s ease', 
      textDecoration: 'underline', 
    },
  };

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
              <span style={styles.value}>{userDetails.fullName || 'N/A'}</span>
            </div>
          </div>
          <div style={styles.textBox}>
            <div style={styles.infoItem}>
              <span style={styles.label}>Email: </span>
              <span style={styles.value}>{userDetails.email || 'N/A'}</span>
            </div>
          </div>
          <div style={styles.addressBox}>
            <div style={styles.addressItem}>
              <span style={styles.label}>Address: </span>
              <span style={styles.value}>{userDetails.address ? userDetails.address : 'N/A'}</span>
            </div>
            <div style={styles.addressItem}>
              <span style={styles.label}>City: </span>
              <span style={styles.value}>{userDetails.city ? userDetails.city : 'N/A'}</span>
            </div>
            <div style={styles.addressItem}>
              <span style={styles.label}>Zipcode: </span>
              <span style={styles.value}>{userDetails.zipcode ? userDetails.zipcode : 'N/A'}</span>
            </div>
            <div style={styles.addressItem}>
              <span style={styles.label}>State: </span>
              <span style={styles.value}>{userDetails.state ? userDetails.state : 'N/A'}</span>
            </div>
            <Link href="/editAddress">
              <button style={styles.editButton}>Edit</button>
            </Link>
          </div>
          {/* Phone details section */}
          <div style={styles.addressBox}>
            <div style={styles.addressItem}>
              <span style={styles.label}>Phone: </span>
              <span style={styles.value}>{userDetails.phone || 'N/A'}</span>
              <Link href="/editPhone">
                <button style={{ ...styles.editButton, top: '-3px', right: '10px' }}>Edit</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountInformation;
