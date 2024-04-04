import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

function Collapsible({question, school1_answer, school2_answer, school1, school2}) {
    const [arrowClicked, setArrowClicked] = useState(false);
    function handleArrowClicked () {
        setArrowClicked(!arrowClicked);
    }
    if (school1_answer===null || school1_answer===undefined) {
        school1_answer = "Unavailable";
    }
    if (school2_answer===null || school2_answer===undefined) {
        school2_answer = "Unavailable";
    }

    return (
        <div className="collaspe-item">
            <div className="collaspe-title" onClick={handleArrowClicked}>
                <div>{question}</div>
                <div>{arrowClicked ? <SlArrowUp fill="black" />: <SlArrowDown fill="black"/>}</div>
            </div>
            {arrowClicked && (
                <div className="collaspe-body">
                    <div>
                        <span style={{ fontWeight: "bold" }}>{`${school1}`}</span>:  
                        {` ${school1_answer}`}
                    </div>
                    <br/>
                    <div>
                        <span style={{ fontWeight: "bold" }}>{`${school2}`}</span>:  
                        {` ${school2_answer}`}
                    </div>
            </div>
            )}
        </div>
    )
}
export default Collapsible;