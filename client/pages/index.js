import React, { useEffect, useState } from 'react';
import HomeScreen from './home_screen';
import Link from 'next/link'; // Import the Link component

console.log('NEXT_PUBLIC_SERVER_URL:', process.env.NEXT_PUBLIC_SERVER_URL);

function Index() {
  const [message, setMessage] = useState('Loading');
  const [error, setError] = useState(null);

  console.log(process.env.NEXT_PUBLIC_SERVER_URL + '/api/home');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + '/api/home');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log(data);
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>{message}</p>
          <HomeScreen />
        </>
      )}

      {/* Add navigation links */}
      <nav>
        <Link href="/login">LoginPage</Link>
        <Link href="/signup">SignupPage</Link>
        <Link href="/profile">ProfilePage</Link>
      </nav>
    </div>
  );
}

export default Index;