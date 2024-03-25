import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import SchoolButton from "../components/SchoolButton";

function Schools() {
  const [schools, setSchools] = useState([]);
  const [message, setMessage] = useState("Loading");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedSearchType, setDebouncedSearchType] = useState("school");
  const [timeoutId, setTimeoutId] = useState(null);
  const [showNoMatchesMessage, setShowNoMatchesMessage] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools")
      .then((response) => response.json())
      .then((data) => {
        setSchools(data.schools);
        setMessage(data.message);
      });
  }, []);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (debouncedQuery.trim() !== "") {
        handleSearch(debouncedQuery, debouncedSearchType);
        setShowNoMatchesMessage(true);
      } else {
        setResults([]);
        setShowNoMatchesMessage(false);
      }
    }, 500);

    setTimeoutId(delayTimer);

    return () => clearTimeout(delayTimer);
  }, [debouncedQuery, debouncedSearchType]);

  const handleSearch = async (query, searchType) => {
    try {
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
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching search results");
      setResults([]);
    }
  };

  return (
    <div className="background-color">
      <section id="hero">
        <h1 className="display-1">Explore High Schools</h1>
        <SearchBar
          onSearch={(query, searchType) => {
            setDebouncedQuery(query);
            setDebouncedSearchType(searchType);
          }}
        />
        {error && <p>{error}</p>}
        <div>
          {results.length > 0 ? (
            results.map((school, index) => (
              <div
                key={index}
                className="d-flex flex-row bd-highlight mb-3 justify-content-center"
              >
                <div className="p-2 border flex-fill bd-highlight">
                  <Card
                    text1={`School Name: ${school.school_name}`}
                    text2={`Address: ${school.address}`}
                    text3={`Website: ${school.website}`}
                    text4={`Phone Number: ${school.phone_number}`}
                    text5={`Email: ${school.email}`}
                  ></Card>

                  <div className="school-button">
                    <SchoolButton
                      link={`/schools/${school.dbn}`}
                    ></SchoolButton>
                  </div>
                </div>
              </div>
            ))
          ) : showNoMatchesMessage ? (
            <p className="search">No matches found!</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}

export default Schools;
