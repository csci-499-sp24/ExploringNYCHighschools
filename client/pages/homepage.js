import React from 'react';
import { FaBars } from "react-icons/fa";
import { useRouter } from 'next/router'; // Import useRouter from next/router

function NavBar() {
  const navLinks = [
    { text: "Home", url: "/" },
    { text: "Search", url: "/schools" }
  ];
  const router = useRouter(); // Get router object from useRouter

  const handleNavLinkClick = (url) => {
    router.push(url); // Navigate to the specified URL
  };

  const handleLoginClick = () => {
    router.push("/login"); // Navigate to the login page
  };

  return (
    <nav style={{
      background: "#333",
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      position: "fixed",
      top: "0",
      left: "0",
      zIndex: "1"
    }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Dropdown items={navLinks} onItemClick={handleNavLinkClick} /> {/* Pass navLinks and handleNavLinkClick as props */}
        <input
          type="text"
          placeholder="Search..."
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            marginLeft: "20px"
          }}
        />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#800080",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
          onClick={handleLoginClick} // Handle login button click
        >
          Login
        </button>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#800080",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginLeft: "10px"
          }}
        >
          Register
        </button>
      </div>
    </nav>
  );
}

function Dropdown({ items, onItemClick }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: "white",
          padding: "8px 12px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        <FaBars />
      </button>
      {isOpen && (
        <div
          style={{
            display: "block",
            position: "absolute",
            backgroundColor: "white",
            minWidth: "160px",
            boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
            zIndex: "1"
          }}
        >
          {items.map(item => (
            <a
              key={item.text}
              href={item.url}
              style={{
                color: "black",
                padding: "12px 16px",
                textDecoration: "none",
                display: "block"
              }}
              onClick={(e) => {
                e.preventDefault();
                onItemClick(item.url); // Call onItemClick with the URL when a dropdown item is clicked
              }}
            >
              {item.text}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        background: "#F5F5F5",
        minHeight: "100vh",
        color: "#333",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "auto",
      }}
    >
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "60px",
          padding: "20px",
        }}
      >
        <h1 style={{ margin: "0" }}>
          <span>Explore NYC High Schools</span>
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div style={{ flex: "1", paddingRight: "20px" }}>
          <h2>Our Mission</h2>
          <p>
            We want to provide comprehensive information and resources
            to help students and families navigate the diverse landscape of NYC
            high schools. We strive to empower students and parents in making
            informed decisions about their education and future.
          </p>
          <p>
            Parents deserve to have faith in the education system that their 
            children will spent their childhood and teenage years in. Their
            futures in college, and later in the workplace, will be shaped by the 
            experiences, challenges, and successes that they met throughout 
            their time in high school.
          </p>
          <p>
            In essence, our commitment extends far beyond mere information 
            dissemination; it&apos;s about fostering trust and confidence in the educational journey 
            of each student. By providing a robust framework of support and guidance, we aim 
            to equip parents and students alike with the tools they need to navigate the 
            complexities of the educational landscape. As pillars of the community, we 
            recognize the profound impact that a nurturing and enriching high school experience 
            can have on shaping not just academic success, but also personal growth 
            and fulfillment. Together, let us embark on this journey of empowerment, 
            ensuring that every student&apos;s path through high school is illuminated 
            with opportunity, possibility, and the unwavering belief in a brighter future.
          </p>
        </div>
        <div style={{ flex: "1", paddingLeft: "20px" }}>
          <img
            src="/mother-and-daughter.jpg" // Use relative path to the image
            alt="mother and daughter together"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
