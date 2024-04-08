import React from "react";
import ScrollUpButton from "./ScrollUpButton";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <Background> */}
      <div style={{ marginTop: "60px" }} />
      <NavBar />
      {children}
      <ScrollUpButton />
      {/* </Background> */}
    </div>
  );
};

export default Layout;