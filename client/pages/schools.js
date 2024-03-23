import { useEffect, useState } from "react";
import SchoolButton from "../components/SchoolButton";
import Card from "../components/Card";

function Schools() {
    const [schools, setSchools] = useState([]);
    const [message, setMessage] = useState("Loading");

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools")
        .then((response) => response.json())
        .then((data) => {
            setSchools(data.schools);
            setMessage(data.message);
        });
    }, [schools]);
    return (
        <div className="background-color">
        <section id="hero">
            <h1 className="display-1">Explore High Schools</h1>
                <div>
                    {schools.map((school,index) => (
                        <div key={index}>
                            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                                <div className="p-2 border flex-fill bd-highlight">
                                    <Card text1={`Address: ${school.school_name}`} text2={`Website: ${school.website}`} text3={`Phone Number: ${school.phone_number}`} text4={`Email: ${school.email}`}></Card>
                                
                                <div className="school-button">
                                    {/* <SchoolButton link={`http://localhost:3000/schools/${school.dbn}`}></SchoolButton> */}
                                    <SchoolButton link={`/schools/${school.dbn}`}></SchoolButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
        </section>
        </div>
    )
}

export default Schools;