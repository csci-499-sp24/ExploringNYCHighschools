import { useEffect, useState } from "react";
import SchoolButton from "../components/SchoolButton";
import Card from "../components/Card";
import ScrollUpButton from "../components/ScrollUpButton";
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
  
    const handleSearch = async (query, searchType) => {
      try {
        if (!query) {
          // If query is empty, reset results and return
          setResults([]);
          return;
        }
  
        let endpoint = "";
        if (searchType === "neighborhood") {
          endpoint = `http://localhost:8080/api/schools?neighborhood=${query}`;
        } else if (searchType === "school") {
          endpoint = `http://localhost:8080/api/schools?q=${query}`;
        } else if (searchType === "languages") {
          endpoint = `http://localhost:8080/api/schools?languages=${query}`;
        } else if (searchType === "ap_classes") {
          endpoint = `http://localhost:8080/api/schools?ap_classes=${query}`;
        }
  
        const res = await fetch(endpoint);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
  
        // Assuming "schools" is the array of schools in the response
        const schools = data.schools;
  
        // Filter schools based on the query and search type
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
  
        // Set the schools array as the state
        setResults(filteredSchools);
        setError(null);
      } catch (error) {
        setError("An error occurred while fetching search results");
        setResults([]);
      }
    };
    return (
        <div className="background-color">
        <ScrollUpButton/>
        <section id="hero">
            <h1 className="display-1">Explore High Schools</h1>
            <div>
            <SearchBar onSearch={handleSearch} />
                {error && <p>{error}</p>}
                {(results.length > 0 ? results : schools).map((school, index) => (
                        <div key={index}>
                            <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                                <div className="p-2 border flex-fill bd-highlight">
                                    <Card text1={`School Name: ${school.school_name}`} text2={`Address: ${school.address}`} text3={`Website: ${school.website}`} text4={`Phone Number: ${school.phone_number}`} text5={`Email: ${school.email}`}></Card>
                                
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