import React, { useEffect, useState } from "react";

function Index() {
  const [schools, setSchools] = useState([]);
  const [message, setMessage] = useState("Loading");

  console.log(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home");
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/home")
      .then((response) => response.json())
      .then((data) => {
        setSchools(data.schools);
        setMessage(data.message);
      });
  }, []);

  return (
    <div>
      <h1>Schools:</h1>
      {message ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {schools.map((school, index) => (
            <li key={index}>
              <strong>{school.school_name}</strong> <br /> {school.address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Index;
