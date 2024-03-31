import React from "react";
import ScrollUpButton from "./ScrollUpButton";
import NavBar from "./NavBar";
import Background from "./Background";
import { propTypes } from "react-bootstrap/esm/Image";

const Layout = ({props}) => {
    return(
        <div>
            <ScrollUpButton/>
            {props}
        </div>
    )
}
export default Layout;
