import { useEffect, useState } from "react";
import TextBox from "@/components/TextBox";
import SearchSchoolBar from "@/components/SearchSchoolBar";
import styles from '@/styles/compare.module.css'

function Compare() {
    // fetch school profile data:
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("Loading");

    // fetch school quality reports data:
    const [reports, setReports] = useState([]);
    const [messageReport, setMessageReport] = useState("Loading");

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools")
            .then((response) => response.json())
            .then((data) => {
                setSchools(data.schools);
                setMessage(data.message);
            });
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/quality-reports")
            .then((response) => response.json())
            .then((data) => {
                setReports(data.reports);
                setMessageReport(data.messageReport);
            });
    }, []);

    const [school1, setSchool1] = useState("");
    const [school2, setSchool2] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [school1ProfileData, setSchool1ProfileData] = useState(null);
    const [school2ProfileData, setSchool2ProfileData] = useState(null);
    const [buttonState, setButtonState] = useState(false);
    const [school1Report, setSchool1Report] = useState(null);
    const [school2Report, setSchool2Report] = useState(null);
    const [dbn1, setDbn1] = useState("");
    const [dbn2, setDbn2] = useState("");

    // states used for collasping and expanding all
    const [collapseAll, setCollapseAll] = useState(false);
    const [expandAll, setExpandAll] = useState(false);
    const handleCollapseAll = () => {
        setCollapseAll(true);
        setExpandAll(false);
    }
    const handleExpandAll = () => {
        setExpandAll(true);
        setCollapseAll(false);
    }

    useEffect(() => {
        // selected schools and set profiles, now set reports using dbn since quality-reports data has some school_names differences(shortened names)
        if (dbn1 !== "" && dbn2 !== "") {
            for (let x = 0; x < reports.length; x++) {
                if (dbn1 === reports[x].dbn) {
                    setSchool1Report(reports[x]);
                }
            }
            for (let x = 0; x < reports.length; x++) {
                if (dbn2 === reports[x].dbn) {
                    setSchool2Report(reports[x]);
                }
            }
            setButtonState(true);
        }
    }, [reports, dbn1, dbn2]);

    // set state for selected schools:
    const handleSelectedSchool1 = (selectedSchool) => {
        setSchool1(selectedSchool);

        //reset data for new selections
        setButtonState(false);
        setSchool1ProfileData(null);
        setSchool1Report(null);
        setDbn1("");
        setErrorMessage("");
    }
    const handleSelectedSchool2 = (selectedSchool) => {
        setSchool2(selectedSchool);

        //reset data for new selections
        setButtonState(false);
        setSchool2ProfileData(null);
        setSchool2Report(null);
        setDbn2("");
        setErrorMessage("");
    }
    const handleCompare = () => {
        if (school1 === school2) {
            setErrorMessage("Please select 2 different schools to compare");
        }
        if (errorMessage === "" && school1 !== "" && school2 !== "") {
            for (let x = 0; x < schools.length; x++) {
                if (school1 === schools[x].school_name) {
                    setSchool1ProfileData(schools[x]);
                    setDbn1(schools[x].dbn);
                }
            }
            for (let x = 0; x < schools.length; x++) {
                if (school2 === schools[x].school_name) {
                    setSchool2ProfileData(schools[x]);
                    setDbn2(schools[x].dbn);
                }
            }
            setButtonState(true);
        }

        else {
            setSchool1ProfileData(null);
            setSchool2ProfileData(null);
            setSchool1Report(null);
            setSchool2Report(null);
            setButtonState(false);
        }
    }
    return (
        <div className="background-color">
            <h1 className="display-1">Comparing High Schools</h1>
            <div className="search-compare">
                <div className="search-bars">
                    <SearchSchoolBar onSearch={handleSelectedSchool1} schools={schools} />
                    <SearchSchoolBar onSearch={handleSelectedSchool2} schools={schools} />
                </div>
                <button className="btn btn-primary compare" onClick={handleCompare}>Compare</button>
            </div>

            {errorMessage && (
                <div className="message-select-schools">
                    <p >{errorMessage}</p> </div>)
            }
            {school1ProfileData && school2ProfileData && buttonState && errorMessage === "" &&
                (
                <div>
                    <br/>
                <div className="collaspe-item">
                <div className="collaspe-body">
                    <div className="school-data">
                        <span style={{ fontWeight: "bold", fontSize: "17px"}}>{`${school1}`}</span>
                    </div>
                    <div className="school-data">
                        <span style={{ fontWeight: "bold", fontSize: "17px" }}>{`${school2}`}</span>
                    </div>
                </div>
                </div>
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
                            },
                            {
                                question: "How many students go to this school?",
                                school1_answer: school1ProfileData.total_students,
                                school2_answer: school2ProfileData.total_students
                            },
                            {
                                question: "What is the graduation rate?",
                                school1_answer: school1ProfileData.grad_rate,
                                school2_answer: school2ProfileData.grad_rate
                            },
                            {
                                question: "What is the attendance rate?",
                                school1_answer: school1ProfileData.attendance_rate,
                                school2_answer: school2ProfileData.attendance_rate
                            },
                            {
                                question: "What is the college career rate?",
                                school1_answer: school1ProfileData.college_career_rate,
                                school2_answer: school2ProfileData.college_career_rate
                            },
                            {
                                question: "What is the student safety rating?",
                                school1_answer: school1ProfileData.student_safety,
                                school2_answer: school2ProfileData.student_safety
                            },
                            {
                                question: "What neighborhood is the school in?",
                                school1_answer: school1ProfileData.neighborhood,
                                school2_answer: school2ProfileData.neighborhood
                            },
                            {
                                question: "What subways can you take?",
                                school1_answer: school1ProfileData.subways_to_school,
                                school2_answer: school2ProfileData.subways_to_school
                            },
                            {
                                question: "What buses can you take?",
                                school1_answer: school1ProfileData.bus_to_school,
                                school2_answer: school2ProfileData.bus_to_school
                            }
                        ].map((item,index)=> (
                            <TextBox key={index} question={item.question} school1_answer={item.school1_answer} school2_answer={item.school2_answer}/>
                        ))}
                    </div>

                    </div>
                )
            }
            {school1Report && school2Report && buttonState && errorMessage === "" &&
                (
                    <div className="collaspe">
                        {[
                            {
                                question: "How rigorous is the instruction?",
                                school1_answer: school1Report.rigorous_instruction_rating,
                                school2_answer: school2Report.rigorous_instruction_rating,
                            },
                            {
                                question: "How well do the teachers collaborate?",
                                school1_answer: school1Report.collaborative_teachers_rating,
                                school2_answer: school2Report.collaborative_teachers_rating
                            },
                            {
                                question: "How supportive is the school environment?",
                                school1_answer: school1Report.supportive_env_rating,
                                school2_answer: school2Report.supportive_env_rating
                            },
                            {
                                question: "How effective is the school leadership?",
                                school1_answer: school1Report.effective_school_leadership,
                                school2_answer: school2Report.effective_school_leadership
                            },
                            {
                                question: "What is the student achievement rating?",
                                school1_answer: school1Report.student_achievement_rating,
                                school2_answer: school2Report.student_achievement_rating
                            },
                            {
                                question: "What is the trust rating of the school?",
                                school1_answer: school1Report.trust_rating,
                                school2_answer: school2Report.trust_rating
                            },
                            {
                                question: "How interesting and challenging are the work for students?",
                                school1_answer: school1Report.interesting_and_challenging,
                                school2_answer: school2Report.interesting_and_challenging
                            },
                            {
                                question: "How effective is the teaching and learning?",
                                school1_answer: school1Report.effective_teaching_learning,
                                school2_answer: school2Report.effective_teaching_learning
                            },
                            {
                                question: "How well does the school assess what students are learning?",
                                school1_answer: school1Report.school_access_student_learning,
                                school2_answer: school2Report.school_access_student_learning
                            },
                            {
                                question: "How clearly are high expectations communicated students and staff?",
                                school1_answer: school1Report.high_expectations_communnicated,
                                school2_answer: school2Report.high_expectations_communnicated
                            },
                            {
                                question: "How well do teachers work together?",
                                school1_answer: school1Report.teacher_collab,
                                school2_answer: school2Report.teacher_collab,
                            },
                            {
                                question: "How safe and inclusive is the school while supporting social-emotional growth?",
                                school1_answer: school1Report.safe_inclusive,
                                school2_answer: school2Report.safe_inclusive
                            },
                            {
                                question: "How well does the school identify, track, and meet its goals?",
                                school1_answer: school1Report.track_and_meet_goals,
                                school2_answer: school2Report.track_and_meet_goals
                            },
                            {
                                question: "How thoughful is the school's approach to teacher development and evaluation?",
                                school1_answer: school1Report.teacher_development_eval,
                                school2_answer: school2Report.teacher_development_eval
                            },
                            {
                                question: "How many students are English Language learners?",
                                school1_answer: school1Report.english_lang_learners,
                                school2_answer: school2Report.english_lang_learners
                            },
                            {
                                question: "How many students have disabilities?",
                                school1_answer: school1Report.students_disabilities,
                                school2_answer: school2Report.students_disabilities
                            },
                            {
                                question: "What is the economic need index?",
                                school1_answer: school1Report.economic_need,
                                school2_answer: school2Report.economic_need
                            },
                            {
                                question: "What percetage is the student body is Asian?",
                                school1_answer: school1Report.asian,
                                school2_answer: school2Report.asian
                            },
                            {
                                question: "What percetage is the student body is Black?",
                                school1_answer: school1Report.black,
                                school2_answer: school2Report.black
                            },
                            {
                                question: "What percetage is the student body is Hispanic?",
                                school1_answer: school1Report.hispanic,
                                school2_answer: school2Report.hispanic
                            },
                            {
                                question: "What percetage is the student body is White?",
                                school1_answer: school1Report.white,
                                school2_answer: school2Report.white
                            },
                            {
                                question: "How many years of experience does the school principal have?",
                                school1_answer: school1Report.principal_yr_experience,
                                school2_answer: school2Report.principal_yr_experience
                            },
                            {
                                question: "How many teachers have at least 3 years of experience?",
                                school1_answer: school1Report.teachers_3yr_experience,
                                school2_answer: school2Report.teachers_3yr_experience
                            },
                            {
                                question: "How many students are chronically absent?",
                                school1_answer: school1Report.chronically_absent_stu,
                                school2_answer: school2Report.chronically_absent_stu
                            },
                            {
                                question: "What is the teacher attendance rate?",
                                school1_answer: school1Report.teacher_attendance_rate,
                                school2_answer: school2Report.teacher_attendance_rate
                            },
                            {
                                question: "How strong is family community ties?",
                                school1_answer: school1Report.family_community_ties,
                                school2_answer: school2Report.family_community_ties
                            }
                        ].map((item,index)=> (
                            <TextBox key={index} question={item.question} school1_answer={item.school1_answer} school2_answer={item.school2_answer}/>

                        ))}
                    </div>
                )}
        </div>
    )
}

export default Compare;
