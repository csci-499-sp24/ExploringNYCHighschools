import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

function Collapsible({question, school1_answer, school2_answer, expand, collapse}) {
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
    useEffect(() => {
        if(expand) {
            setArrowClicked(true);
        }
        else if(collapse){
            setArrowClicked(false);
        }
    }, [expand,collapse]);
    return (
        <div className="collaspe-item">
            <div className="collaspe-title" onClick={handleArrowClicked}>
                <div>{question}</div>
                <div>{arrowClicked ? <SlArrowUp fill="black" />: <SlArrowDown fill="black"/>}</div>
            </div>
            {arrowClicked && (
                <div className="collaspe-body">
                    <div className="school-data">
                        {` ${school1_answer}`}
                    </div>
                    <br/>
                    <div className="school-data">
                        {` ${school2_answer}`}
                    </div>
                </div>
            )}
        </div>
    )
}
export default Collapsible;