import React from 'react';
import { FaBars } from "react-icons/fa"

function NavBar() {
 const dropdownItems = [
  //  { text: "Home", url: "#" },
  //  { text: "Enrollment", url: "#" },
  //  { text: "Find a school", url: "#" },
  //  { text: "About", url: "#" }
   { text: "Home", url: "/" },
   { text: "Search", url: "/schools" },
   { text: "Login", url: "#" },  /* if user is logged in, change to logout */
   { text: "Register", url: "#" }  /* if user is logged in, change to View Profile */
 ];

 return (
   <nav style={{
     background: "gray",
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
     <Dropdown items={dropdownItems} />
     <div style={{ display: "flex", alignItems: "center" }}>
       <input type="text" placeholder="Search..." style={{ padding: "10px", marginRight: "10px" }} />
       <button style={{
         padding: "10px",
         backgroundColor: "#800080",
         color: "white",
         border: "none",
         borderRadius: "4px",
         cursor: "pointer"
       }}>Sign Up</button>
     </div>
   </nav>
 );
}

function Dropdown({ items }) {
 const [isOpen, setIsOpen] = React.useState(false);

 return (
   <div
     style={{ position: "relative", display: "inline-block" }}
     onMouseEnter={() => setIsOpen(true)}
     onMouseLeave={() => setIsOpen(false)}
   >
     <button style={{
       backgroundColor: "transparent",
       border: "none",
       color: "white",
       padding: "10px",
       fontSize: "16px",
       cursor: "pointer"
     }}><FaBars/></button>
     {isOpen && (
       <div style={{
         display: "block",
         position: "absolute",
         backgroundColor: "white",
         minWidth: "160px",
         boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
         zIndex: "1"
       }}>
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
           >{item.text}</a>
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
        // background: "linear-gradient(100deg, #C3B1E1, #CCCCFF)",
        background: "linear-gradient(to bottom, #C3B1E1, #CCCCFF, transparent)",
        minHeight: "100vh",
        color: "white",
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
          <h2>Mission Statement</h2>
          <p>
            Our mission is to provide comprehensive information and resources
            to help students and families navigate the diverse landscape of NYC
            high schools. We strive to empower students and parents in making
            informed decisions about their education and future.
          </p>
        </div>
        <div style={{ flex: "1", paddingLeft: "20px" }}>
          <img
            src={process.env.PUBLIC_URL + "/mother-and-daughter.jpg"}
            alt="mother and daughter using laptop"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}
export default App;