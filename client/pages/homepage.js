import React from 'react';
import Layout from './Layout';

function App() {
  return (
    <Layout>
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
    </Layout>
  );
}

export default App;
