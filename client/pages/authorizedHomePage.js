import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';

const LoggedinHomepage = () => {
  const [user] = useAuthState(auth);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    './mother-and-daughter.jpg',
    './fathersoncs.jpg',
    './Middle-School-Parent-Guide.jpg',
    // Add more image paths as needed
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); // Change image every 10 seconds (10000 milliseconds)
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <NavBar />
      {user ? (
        <div className="background-color" style={{ minHeight: "100vh", color: "#333" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "60px", padding: "20px" }}>
            <h1 style={{ margin: "0" }}>
              <span>Explore NYC High Schools</span>
            </h1>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "40px" }}>
            <div style={{ flex: "1", paddingRight: "40px" }}>
              <h2>Our Mission</h2>
              <p>
                We want to provide comprehensive information and resources to help students and families navigate the diverse landscape of NYC high schools. We strive to empower students and parents in making informed decisions about their education and future.
              </p>
              <p>
                Parents deserve to have faith in the education system that their children will spend their childhood and teenage years in. Their futures in college, and later in the workplace, will be shaped by the experiences, challenges, and successes that they met throughout their time in high school.
              </p>
              <p>
                In essence, our commitment extends far beyond mere information dissemination; it&apos;s about fostering trust and confidence in the educational journey of each student. By providing a robust framework of support and guidance, we aim to equip parents and students alike with the tools they need to navigate the complexities of the educational landscape. As pillars of the community, we recognize the profound impact that a nurturing and enriching high school experience can have on shaping not just academic success, but also personal growth and fulfillment. Together, let us embark on this journey of empowerment, ensuring that every student&apos;s path through high school is illuminated with opportunity, possibility, and the unwavering belief in a brighter future.
              </p>
            </div>
            <div style={{ flex: "1", paddingLeft: "40px", position: "relative", overflow: "hidden", width: "600px", height: "600px", marginTop: "-40px" }}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: index === currentImageIndex ? 1 : 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LoggedinHomepage;