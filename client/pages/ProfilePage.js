import React from 'react';
import ProfilePage from 'client/pages/ProfilePage'

const ProfilePage = () => {
  // Here, you would typically fetch the user's data from a server
  const userData = {
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    savedSchools: [
      { name: 'School Name 1', location: 'Location 1' },
      { name: 'School Name 3', location: 'Location 3' },
    ],
  };

  return (
    <div>
      <h2>Profile</h2>
      <div>
        <p>Username: {userData.username}</p>
        <p>Email: {userData.email}</p>
      </div>
      <h3>Saved Schools</h3>
      {userData.savedSchools.length > 0 ? (
        <div>
          {userData.savedSchools.map((school, index) => (
            <div key={index}>
              <p>{school.name}</p>
              <p>{school.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved schools yet.</p>
      )}
    </div>
  );
};

export default ProfilePage;