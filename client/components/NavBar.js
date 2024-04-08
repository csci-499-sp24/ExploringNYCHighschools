import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { auth } from "../firebase/firebaseConfig";
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';

function NavBar() {
  const navbarItems = [
    { text: "Home", url: "/homepage" },
    { text: "Search For Schools", url: "/schools" },
  ];

  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.replace('/homepage');
    } catch (error) {
      console.log(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItemStyle = {
    padding: "5px 10px",
    backgroundColor: "transparent",
    color: "#800080",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    width: "100%",
    outline: "none",
    textAlign: "left",
    transition: "background-color 0.3s",
  };

  const menuItemHoverStyle = {
    ...menuItemStyle,
    backgroundColor: "#F0E6F7",
  };

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
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        {user ? (
          <div
            ref={dropdownRef}
            onClick={toggleDropdown}
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <img
              src="./profile-icon.png"
              alt="Profile"
              style={{ width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" }}
            />
            {isDropdownOpen && (
              <div style={{ position: "absolute", top: "40px", right: "0", backgroundColor: "white", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
                <Link href="/account-information" passHref>
                  <button
                    style={menuItemStyle}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = menuItemStyle.backgroundColor)}
                  >
                    Account Information
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  style={menuItemStyle}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = menuItemHoverStyle.backgroundColor)}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = menuItemStyle.backgroundColor)}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/signin" passHref>
              <button style={{ padding: "10px", backgroundColor: "#800080", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", marginRight: "10px" }}>
                Login
              </button>
            </Link>
            <Link href="/signup" passHref>
              <button style={{ padding: "10px", backgroundColor: "#800080", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;