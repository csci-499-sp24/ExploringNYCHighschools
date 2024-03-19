import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SchoolProfile() {
    const router = useRouter();
    const { dbn } = router.query;
    const [school, setSchool] = useState([]);
    const[message, setMessage] = useState("Loading");

    useEffect(() => {
        if (dbn) {
            fetch(`http://localhost:3000/api/schools/${dbn}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.school) {
                    setSchool(data.school);
                    setMessage(data.message);
                } else {
                    setMessage("School data not found!");
                }
            });
        }
    }, [dbn]);

    return (
        <section id="hero">
            <div className="container">
                <div className="row">
                    <h1 className="display-1">{school.school_name}</h1>
                    <p className="desc">{school.description}</p>
                </div>
            </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 border flex-fill bd-highlight">
                            <div className="card-fill">
                                <div className="card-body">
                                    <h6 className="card-title">Address: {school.address}</h6>
                                    <h6 className="card-title">Website: {school.website}</h6>
                                    <h6 className="card-title">Phone number: {school.phone_number}</h6>
                                    <h6 className="card-title">Email: {school.email}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Languages</h5>
                                    <p className="card-text">{school.languages}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">AP Courses</h5>
                                    <p className="card-text">{school.ap_classes}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Graduation Rate</h5>
                                    <p className="card-text">{school.grad_rate}</p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Subway</h5>
                                <p className="card-text">{school.subways_to_school}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Buses</h5>
                                <p className="card-text">{school.bus_to_school}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Grade Span</h5>
                                <p className="card-text">{school.grade_span}</p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Total Students</h5>
                                <p className="card-text">{school.total_students}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Freshman Schedule</h5>
                                <p className="card-text">{school.freshmen_schedule}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">PSAL Boys</h5>
                                <p className="card-text">{school.psal_boys}</p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
                <div className="row">
                    <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">PSAL Girls</h5>
                                <p className="card-text">{school.psal_girls}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Attendance Rate</h5>
                                <p className="card-text">{school.attendance_rate}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-2 bd-highlight">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">School Safety</h5>
                                <p className="card-text">{school.student_safety}</p>
                                </div>
                            </div>
                        </div>
                    </div>     
                </div>
        </section>
    )
}

export default SchoolProfile;



