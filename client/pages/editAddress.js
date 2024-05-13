import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth, firestore } from '../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const EditAddress = () => {
  const [addressInfo, setAddressInfo] = useState({
    address: '',
    city: '',
    zipcode: '',
    state: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchAddressInfo = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userId = currentUser.uid;
        const userRef = doc(firestore, 'users', userId);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setAddressInfo({
            address: userData.address || '',
            city: userData.city || '',
            zipcode: userData.zipcode || '',
            state: userData.state || '',
          });
        }
      }
    };

    fetchAddressInfo();
  }, []);

  const handleInputChange = (e) => {
    setAddressInfo({
      ...addressInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userId = currentUser.uid;
      const userRef = doc(firestore, 'users', userId);
      await updateDoc(userRef, addressInfo);
      router.push('/account-information');
    }
  };

  return (
   <div className="background-color"
   style={{
     minHeight: "70vh",
     color: "#333",
   }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
      <div style={{ width: '300px' }}>
        <h1>Edit Address</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your address"
            name="address"
            value={addressInfo.address}
            onChange={handleInputChange}
            style={{ marginBottom: '10px', width: '100%' }}
          />
          <div style={{ display: 'flex', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="City"
              name="city"
              value={addressInfo.city}
              onChange={handleInputChange}
              style={{ marginRight: '10px', width: 'calc(50% - 5px)' }}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              value={addressInfo.state}
              onChange={handleInputChange}
              style={{ marginRight: '10px', width: 'calc(25% - 5px)' }}
            />
            <input
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={addressInfo.zipcode}
              onChange={handleInputChange}
              style={{ width: 'calc(25% - 5px)' }}
            />
          </div>
          <button type="submit" style={{ width: '100%' }}>
            Save
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default EditAddress;