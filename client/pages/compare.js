import { useEffect, useState } from "react";
import Collapsible from "@/components/Collapsible";

function CompareSchools () {
    // // fetch school profile data:
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("Loading");

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools")
        .then((response) => response.json())
        .then((data) => {
            setSchools(data.schools);
            setMessage(data.message);
        });
    }, []);

    // state for selecting schools from drop down:
    const [school1, setSchool1] = useState("");
    const [school2, setSchool2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [school1ProfileData, setSchool1ProfileData] = useState(null);
    const [school2ProfileData, setSchool2ProfileData] = useState(null);
    const [buttonState, setButtonState] = useState(false);

    // set state for selected schools:
    const handleSelectedSchool1 = (e) => {
        setSchool1(e.target.value);
        if (e.target.value === school2) {
            setErrorMessage("Please select 2 different schools to compare");
        }
        else if(e.target.value==="") {
            setErrorMessage("Please select schools to compare");
        }
        else {
            setErrorMessage("");
        }
        setButtonState(false);
    }
    const handleSelectedSchool2 = (e) => {
        setSchool2(e.target.value);
        if (e.target.value === school1) {
            setErrorMessage("Please select 2 different schools to compare");
        }
        else {
            setErrorMessage("");
        }
        setButtonState(false);
    }
    const handleCompare= () => {
        if (errorMessage==="") {
            for (let x = 0;x<schools.length;x++) {
                if(school1===schools[x].school_name) {
                    setSchool1ProfileData(schools[x]);
                }
            }
            for (let x = 0;x<schools.length;x++) {
                if(school2===schools[x].school_name) {
                    setSchool2ProfileData(schools[x]);
                }
            }
        }
        else {
            setSchool1ProfileData(null);
            setSchool2ProfileData(null);
        }
        setButtonState(true);
    }

    return (
        <div className="background-color">
            <h1 className="display-1">Comparing High Schools</h1>
            <div>
                <select className="select-box" value={school1.school_name} onChange={handleSelectedSchool1}>
                <option value="">Select School 1</option>
                {schools.map((school, index) => (
                    <option key={index} value={school.school_name}>{school.school_name}</option>
                ))}
                </select>
                <select className="select-box" value={school2.school_name} onChange={handleSelectedSchool2}>
                <option value="">Select School 2</option>
                {schools.map((school, index) => (
                    <option key={index} value={school.school_name}>{school.school_name}</option>
                ))}
                </select>
            </div>
                <button className="btn btn-primary compare" onClick={handleCompare}>Compare</button>
                {errorMessage && buttonState ? (<p>{errorMessage}</p>) : ""}
                {school1ProfileData && school2ProfileData && buttonState &&
                (
                    <div className="collaspe">
                        {[
                            {
                                question: "What languages are offered to students?",
                                school1_answer: school1ProfileData.languages,
                                school2_answer: school2ProfileData.languages,
                            },
                            {
                                question: "What AP courses are offered to students?",
                                school1_answer: school1ProfileData.ap_classes,
                                school2_answer: school2ProfileData.ap_classes
                            },
                            {
                                question: "What PSAL sports are offered to male students?",
                                school1_answer: school1ProfileData.psal_boys,
                                school2_answer: school2ProfileData.psal_boys
                            },
                            {
                                question: "What PSAL sports are offered to female students?",
                                school1_answer: school1ProfileData.psal_girls,
                                school2_answer: school2ProfileData.psal_girls
                            }
                        ].map((item,index)=> (
                            <Collapsible key={index} question={item.question} school1_answer={item.school1_answer} school2_answer={item.school2_answer} school1={school1} school2={school2}/>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default CompareSchools;