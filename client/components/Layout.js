import React from "react";
import ScrollUpButton from "./ScrollUpButton";

const Layout = ({props}) => {
    return(
        <div>
            <ScrollUpButton/>
            {props}
        </div>
    )
}
export default Layout;
