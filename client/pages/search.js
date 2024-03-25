import React from 'react';

function NavBar() {
  const dropdownItems = [
    { text: "Home", url: "#" },
    { text: "Enrollment", url: "#" },
    { text: "Find a school", url: "#" },
    { text: "About", url: "#" }
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
      <h1 style={{ margin: "0" }}>
        <span style={{ color: "#90EE90" }}>Explore</span>{' '}
        <span style={{ color: "#ADD8E6" }}>NYC High Schools</span>
      </h1>
      <input type="text" placeholder="Search..." style={{ padding: "10px", marginRight: "10px" }} />
      <button style={{
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "40px"
      }}>Sign Up</button>
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
      }}>Menu</button>
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

function LeftSidebar() {
  const [selectedFilters, setSelectedFilters] = React.useState([]);

  const handleFilterClick = () => {
    const newFilters = [];
    if (document.getElementById("filter1").checked) {
      newFilters.push("Filter 1");
    }
    if (document.getElementById("filter2").checked) {
      newFilters.push("Filter 2");
    }
    setSelectedFilters(newFilters);
    console.log("Selected Filters:", newFilters);
  };

  return (
    <div style={{
      background: "lightgrey",
      width: "200px",
      height: "calc(100vh - 50px)",
      position: "fixed",
      top: "50px",
      left: "0",
      padding: "20px"
    }}>
      <input type="checkbox" id="filter1" />
      <label htmlFor="filter1">Filter 1</label>
      <br />
      <input type="checkbox" id="filter2" />
      <label htmlFor="filter2">Filter 2</label>
      <br />
      <button onClick={handleFilterClick} style={{ marginTop: "10px" }}>Filter</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <LeftSidebar />
        <div style={{ marginLeft: "220px", padding: "20px" }}>
          {/* Main content */}
        </div>
      </div>
    </div>
  );
}

export default App;