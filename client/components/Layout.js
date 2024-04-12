import React from "react";
import ScrollUpButton from "./ScrollUpButton";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";

const Layout = ({props}) => {
    return(
        <div>
            {/* <Background> */}
            <div style={{marginTop: "60px"}}/>
            <NavBar/>
            <ScrollUpButton/>
            {props}
            {/* </Background> */}
        </div>
    )
}
export default Layout;
