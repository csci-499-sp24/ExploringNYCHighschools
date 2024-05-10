import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { IoTrainSharp } from "react-icons/io5";
import { FaBusAlt } from "react-icons/fa";

function Collapsible({subway, bus}) {
    const [arrowClicked, setArrowClicked] = useState(false);
    function handleArrowClicked () {
        setArrowClicked(!arrowClicked);
    }
    if (subway===null || subway===undefined) {
        subway = "Unavailable";
    }
    if (bus===null || bus===undefined) {
        bus = "Unavailable";
    }
    return (
        <div className="collaspe-item">
            <div className="collaspe-title" onClick={handleArrowClicked}>
                {/* <div style={{ fontSize: "16px"}}>{question}</div> */}
                <div className="school-data">
                        <IoTrainSharp/> Subway
                    </div>
                    <div className="school-data">
                        <FaBusAlt/> Bus
                    </div>
                <div>{arrowClicked ? <SlArrowUp fill="black" />: <SlArrowDown fill="black"/>}</div>
            </div>
            {arrowClicked && (
                <div className="collaspe-body">
                    <div className="school-data">
                        {` ${subway}`}
                    </div>
                    <br/>
                    <div className="school-data">
                        {` ${bus}`}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Collapsible;