import React from 'react';

function Background({ children }) {
  return (
    <div
      style={{
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
      {children}
    </div>
  );
}

export default Background;