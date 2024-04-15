import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { useRouter } from "next/router";

const SearchBar = () => {
  const [schools, setSchools] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedSchool, setSelectedSchool] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`)
      .then((response) => response.json())
      .then((data) => {
        setSchools(data.schools);
        setFilteredSchools(data.schools);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
      });
  }, []);

  const handleSearch = (query) => {
    setQuery(query);
    const filteredResults = schools.filter((school) =>
      school.school_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSchools(filteredResults);
    setSelectedSchool(null);
  };

  const handleSelectedSchool = (selected) => {
    if (selected.length > 0) {
      setSelectedSchool(selected[0]);
    } else {
      setSelectedSchool(null);
    }
  };

  const goToSchoolPage = () => {
    if (selectedSchool) {
      const { dbn } = selectedSchool;
      router.push(`/schools/${dbn}`);
      setQuery("");
    }
  };

  return (
    <div className="searchbar">
      <Typeahead
        id="school-search"
        labelKey="school_name"
        options={filteredSchools}
        onSearch={(query) => handleSearch(query)}
        placeholder="Search by school name..."
        onChange={(selected) => handleSelectedSchool(selected)}
      />
      <button
        onClick={goToSchoolPage}
        disabled={!selectedSchool}
        className="search-bar-button"
      >
        Go
      </button>
    </div>
  );
};

export default SearchBar;
