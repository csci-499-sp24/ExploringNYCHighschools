import React from 'react';
import Link from 'next/link';

function NavBar() {
  const navbarItems = [
    { text: "Home", url: "/homepage" },
    { text: "Search For Schools", url: "/schools" },
  ];

  return (
    <nav style={{ background: "#CBC3E3", width: "100%", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "fixed", top: "0", left: "0", zIndex: "1" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <a key={navbarItems[0].text} href={navbarItems[0].url} style={{ color: "white", padding: "10px", textDecoration: "none", marginRight: "10px" }}>
          {navbarItems[0].text}
        </a>
        <div style={{ height: "20px", width: "3px", backgroundColor: "lightgray", marginLeft: "10px", marginRight: "10px", }} />
        <a key={navbarItems[1].text} href={navbarItems[1].url} style={{ color: "white", padding: "10px", textDecoration: "none", }}>
          {navbarItems[1].text}
        </a>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link href="/signin" passHref>
          <button style={{ padding: "10px", backgroundColor: "#800080", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>
            Login
          </button>
        </Link>
        {/* Use the Link component to create a link to the /signup page */}
        <Link href="/signup" passHref>
          <button style={{ padding: "10px", backgroundColor: "#800080", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;