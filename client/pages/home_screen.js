import React, { useState } from 'react';

const HomeScreen = () => {
  const [schools, setSchools] = useState([
    { name: "School Name 1", location: "Location 1" },
    { name: "School Name 2", location: "Location 2" },
    { name: "School Name 3", location: "Location 3" },
    { name: "School Name 4", location: "Location 4" },
  ]);

  return (
    <div>
      <div className="left-bar"></div>
      <div className="top-bar"></div>
      <h1>
        <span className="blue">Explore</span> <span>NYC High Schools</span>
      </h1>
      <div className="search-bar">
        <input type="text" placeholder="Search High Schools" />
        <i className="fa fa-search"></i>
      </div>
      <div className="schools-container">
        {schools.map((school, index) => (
          <div className="school-card" key={index}>
            <div className="school-name">{school.name}</div>
            <div className="school-location">{school.location}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        /* CSS styles go here */
        

        
        h1 {
          margin-top: 50px;
          text-align: center;
        }

        .search-bar {
          margin: 20px auto;
          width: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .search-bar input {
          padding: 10px;
          width: 70%;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }

        .schools-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 0 auto;
          width: 80%;
        }

        .school-card {
          background-color: #f4f4f4;
          padding: 20px;
          border-radius: 5px;
        }

        .school-name {
          font-weight: bold;
        }

        .school-location {
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default HomeScreen;