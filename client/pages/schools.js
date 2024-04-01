import { useEffect, useState } from "react";
import SchoolButton from "../components/SchoolButton";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

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

    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [foundQuery, setFoundQuery] = useState(false);
  
    const handleSearch = async (query, searchType) => {
      try {
        if (!query) {
          setResults([]);
          setFoundQuery(false);
          return;
        }
  
        let endpoint = "";
        if (searchType === "neighborhood") {
          endpoint = process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools?neighborhood=${query}`;
        } else if (searchType === "school") {
          endpoint = process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools?q=${query}`;
        } else if (searchType === "languages") {
          endpoint = process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools?languages=${query}`;
        } else if (searchType === "ap_classes") {
          endpoint = process.env.NEXT_PUBLIC_SERVER_URL + `/api/schools?ap_classes=${query}`;
        }
  
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
  
        const schools = data.schools;
  
        const filteredSchools = schools.filter((school) => {
          if (searchType === "neighborhood") {
            return school.neighborhood
              .toLowerCase()
              .includes(query.toLowerCase());
          } else if (searchType === "school") {
            return school.school_name.toLowerCase().includes(query.toLowerCase());
          } else if (searchType === "languages") {
            return (
              school.languages &&
              school.languages.toLowerCase().includes(query.toLowerCase())
            );
          } else if (searchType === "ap_classes") {
            return (
              school.ap_classes &&
              school.ap_classes.toLowerCase().includes(query.toLowerCase())
            );
          }
        });
  
        setResults(filteredSchools);
        setFoundQuery(true);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching search results");
        setResults([]);
        setFoundQuery(false);
      }
    };
    return (
        <div className="background-color">
        <section id="hero">
            <h1 className="display-1">Explore High Schools</h1>
            <SearchBar onSearch={handleSearch} />
                {error && <p>{error}</p>}
                <div>
                {foundQuery ? (
                    results.length > 0 ? (results.map((school, index) => (
                            <div key={index} className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                                <div className="p-2 border flex-fill bd-highlight">
                                    <Card text1={`School Name: ${school.school_name}`} text2={`Address: ${school.address}`} text3={`Website: ${school.website}`} text4={`Phone Number: ${school.phone_number}`} text5={`Email: ${school.email}`}></Card>
                                <div className="school-button">
                                    <SchoolButton link={`/schools/${school.dbn}`}></SchoolButton>
                                    <SchoolButton link={`/schools/quality-reports/${school.dbn}`} text={"View School Quality Report"}></SchoolButton>
                                </div>
                            </div>
                        </div>
                ))
                ) : ( <p className="search">No matches found!</p> )
                ) : (schools.map((school, index) => (
                    <div key={index} className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                                <div className="p-2 border flex-fill bd-highlight">
                                    <Card text1={`School Name: ${school.school_name}`} text2={`Address: ${school.address}`} text3={`Website: ${school.website}`} text4={`Phone Number: ${school.phone_number}`} text5={`Email: ${school.email}`}></Card>
                                
                                <div className="school-button">
                                    <SchoolButton link={`/schools/${school.dbn}`}></SchoolButton>
                                    <SchoolButton link={`/schools/quality-reports/${school.dbn}`} text={"Go to School Quality Report"}></SchoolButton>
                                </div>
                            </div>
                        </div>
                ))
                )}
                </div>
                
        </section>
        </div>
    )            
}

export default Schools;