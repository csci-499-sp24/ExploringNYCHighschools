import React, { useState, useEffect } from "react";

function TextBox({question, school1_answer, school2_answer}) {
    if (school1_answer===null || school1_answer===undefined) {
        school1_answer = "Unavailable";
    }
    if (school2_answer===null || school2_answer===undefined) {
        school2_answer = "Unavailable";
    }
    return (
        <div className="collaspe-item">
            <div className="collaspe-title">
                <div style={{ fontSize: "18px"}}>{question}</div>
            </div>
            <div className="collaspe-body">
                <div className="school-data">
                    {` ${school1_answer}`}
                </div>
                <br/>
                <div className="school-data">
                    {` ${school2_answer}`}
                </div>
            </div>
        </div>
    )
}
export default TextBox;