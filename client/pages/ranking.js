import { useEffect, useState } from "react";
import TextBoxRanking from "@/components/TextBoxRanking";

function Rankings() {
    // fetch school profile data:
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("Loading");

     // fetch school quality reports data:
     const [reports, setReports] = useState([]);
     const [messageReport, setMessageReport] = useState("Loading");

     const [selectedRanking, setSelectedRanking] = useState("");
     const [rankName, setRankName] = useState("");
     const [fiftySchools, setFiftySchools] = useState([]);
     const [lowestFiftySchools, setLowestFiftySchools] = useState([]);

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

    useEffect(() => {
        if(selectedRanking==="Student Attendance") {
            const ranked_schools = getTopFiftySchools(schools,"attendance_rate");
            const lowest_ranked_schools = getLowestFiftySchools(schools,"attendance_rate");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("attendance_rate");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Teacher Attendance") {
            const ranked_schools = getTopFiftySchools(reports,"teacher_attendance_rate");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"teacher_attendance_rate");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("teacher_attendance_rate");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Safety") {
            const ranked_schools = getTopFiftySchools(schools,"student_safety");
            const lowest_ranked_schools = getLowestFiftySchools(schools,"student_safety");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("student_safety");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Graduation Rates") {
            const ranked_schools = getTopFiftySchools(schools,"grad_rate");
            const lowest_ranked_schools = getLowestFiftySchools(schools,"grad_rate");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("grad_rate");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Rigorous Instruction") {
            const ranked_schools = getTopFiftySchools(reports,"rigorous_instruction_rating");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"rigorous_instruction_rating");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("rigorous_instruction_rating");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="College Career Rate") {
            const ranked_schools = getTopFiftySchools(schools,"college_career_rate");
            const lowest_ranked_schools = getLowestFiftySchools(schools,"college_career_rate");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("college_career_rate");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Teacher Collaboration") {
            const ranked_schools = getTopFiftySchools(reports,"collaborative_teachers_rating");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"collaborative_teachers_rating");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("collaborative_teachers_rating");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Supportive School Environment") {
            const ranked_schools = getTopFiftySchools(reports,"supportive_env_rating");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"supportive_env_rating");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("supportive_env_rating");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Effective School Leadership") {
            const ranked_schools = getTopFiftySchools(reports,"effective_school_leadership");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"effective_school_leadership");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("effective_school_leadership");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Trust Rating") {
            const ranked_schools = getTopFiftySchools(reports,"trust_rating");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"trust_rating");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("trust_rating");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Principal Years of Experience") {
            const ranked_schools = getTopFiftySchools(reports,"principal_yr_experience");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"principal_yr_experience");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("principal_yr_experience");
            setFiftySchools(ranked_schools);
        }
        else if(selectedRanking==="Teachers with at least 3 years experience") {
            const ranked_schools = getTopFiftySchools(reports,"teachers_3yr_experience");
            const lowest_ranked_schools = getLowestFiftySchools(reports,"teachers_3yr_experience");
            setLowestFiftySchools(lowest_ranked_schools);
            setRankName("teachers_3yr_experience");
            setFiftySchools(ranked_schools);
        }
    },[selectedRanking]);

    // function to get 50 top schools:
    function getTopFiftySchools(schools, rank_option) {
        return schools
        .slice().filter(school=>school[rank_option]!==null).sort((school1, school2)=> school2[rank_option] - school1[rank_option])
        .slice(0,50);
    }
    // function to get 50 top schools:
    function getLowestFiftySchools(schools, rank_option) {
        return schools
        .slice().filter(school=>school[rank_option]!==null).sort((school1, school2)=> school1[rank_option] - school2[rank_option])
        .slice(0,50);
    }
   
    // set state for selected schools:
    const handleSelectedRanking = (e) => {
        setSelectedRanking(e.target.value);
        setFiftySchools([]);
        setLowestFiftySchools([]);
    }
    const dropdown_options = ["Student Attendance","Teacher Attendance","Safety","Graduation Rates",
    "College Career Rate","Rigorous Instruction","Teacher Collaboration","Supportive School Environment",
    "Effective School Leadership","Trust Rating","Principal Years of Experience","Teachers with at least 3 years experience"];
    return (
        <div className="background-color">
            <h1 className="display-1">Ranking High Schools</h1>
            <div>
                <select className="select-box" value={selectedRanking} onChange={handleSelectedRanking}>
                    <option value="">Select Ranking</option>
                        {dropdown_options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
                </select>
            </div>
            <br/>
            <div>
            {fiftySchools && lowestFiftySchools && (
                <div className="textbox-ranking">
                    <div className="rank-data" >
                    {selectedRanking!=="" && (
                        <div style={{fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize:"18px"}}>Top Ranking</div>)}
                        {fiftySchools.map((item, index) => (
                        <TextBoxRanking key={index} name={`${index+1}. ${item.school_name}`} content={item[rankName]} school={item.dbn}/>
                    ))}
                   </div>
                   <div className="rank-data">
                    {selectedRanking!=="" && (
                        <div style={{fontFamily: "Georgia, 'Times New Roman', Times, serif", fontSize:"18px"}}>Lowest Ranking</div>)}
                        {lowestFiftySchools.map((item, index) => (
                        <TextBoxRanking key={index} name={`${index+1}. ${item.school_name}`} content={item[rankName]} school={item.dbn}/>
                    ))}
                   </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Rankings;