import React from 'react';

function Background({ children }) {
  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}>
      {children}
    </div>
  );
}

export default Background;