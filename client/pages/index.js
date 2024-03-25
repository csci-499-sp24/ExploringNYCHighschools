import React, { useEffect, useState } from 'react';
import App from './search'; // Import the App component from search.js

function Index() {
  const [message, setMessage] = useState("Loading");

  console.log(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home");
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      });
  }, []);

  return (
    <div>
      <div>Return message from server</div>
      <div>{message}</div>
      <App prop1="Value 1" prop2="Value 2" />
    </div>
  );
}

export default Index;