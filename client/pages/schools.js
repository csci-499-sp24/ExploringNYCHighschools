import React, { useEffect, useState } from "react";
import NeighborhoodDropdown from "@/components/NeighborhoodDropdown";
import LanguageDropdown from "@/components/LanguageDropdown";
import SearchBar from "../components/SearchBar";
import Card from "../components/Card";
import SchoolButton from "../components/SchoolButton";
import ScrollUpButton from "../components/ScrollUpButton";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      const data = await response.json();
      setSchools(data);
      setFilteredSchools(data); // Initially, set filtered schools to all schools
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  const fetchFilteredSchools = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools?`;
      if (selectedNeighborhood) {
        url += `neighborhood=${selectedNeighborhood}&`;
      }
      if (selectedLanguage) {
        url += `languages=${selectedLanguage}&`;
      }
      if (query) {
        url += `term=${query}&`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch filtered schools");
      }
      const data = await response.json();
      setFilteredSchools(data);
    } catch (error) {
      console.error("Error fetching filtered schools:", error);
    }
  };

  useEffect(() => {
    if (selectedNeighborhood || selectedLanguage) {
      fetchFilteredSchools();
    }
  }, [selectedNeighborhood, selectedLanguage]);

  const handleSearch = (query) => {
    setQuery(query);
    const filteredResults = schools.filter((school) =>
      school.school_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSchools(filteredResults);
  };

  const handleNeighborhoodSelect = (neighborhood) => {
    setSelectedNeighborhood(
      neighborhood === "select neighborhood" ? "" : neighborhood
    );
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language === "select language" ? "" : language);
  };

  return (
    <div className="background-color">
      <ScrollUpButton />
      <section id="hero">
        <h1 className="display-1">Explore High Schools</h1>
        <div>
          <SearchBar onSearch={handleSearch} />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ marginRight: "100px" }}>
              <NeighborhoodDropdown onSelect={handleNeighborhoodSelect} />
            </div>
            <div>
              <LanguageDropdown onSelect={handleLanguageSelect} />
            </div>
          </div>
          <div>
            {filteredSchools.map((school, index) => (
              <div key={index}>
                <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                  <div className="p-2 border flex-fill bd-highlight">
                    <Card
                      text1={`School Name: ${school.school_name}`}
                      text2={`Address: ${school.address}`}
                      text3={`Website: ${school.website}`}
                      text4={`Phone Number: ${school.phone_number}`}
                    />
                    <div className="school-button">
                      <SchoolButton link={`/schools/${school.dbn}`} />
                      <SchoolButton
                        link={`/schools/quality-reports/${school.dbn}`}
                        text={"View School Quality Report"}
                      ></SchoolButton>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Schools;
