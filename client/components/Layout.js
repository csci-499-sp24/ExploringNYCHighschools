import React from "react";
import ScrollUpButton from "./ScrollUpButton";
import Background from "@/components/Background";
import NavBar from "@/components/NavBar";

const Layout = ({props}) => {
    return(
        <div>
            <NavBar/>
            <ScrollUpButton/>
            {props}
        </div>
    )
}
export default Layout;
