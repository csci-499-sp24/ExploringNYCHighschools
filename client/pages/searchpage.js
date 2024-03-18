import React, { useState } from "react";
import SearchBar from "../components/searchbar";

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    try {
      const res = await fetch(`http://localhost:8080/api/home?q=${query}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();

      // Assuming "schools" is the array of schools in the response
      const schools = data.schools;

      // Filter schools based on the query
      const filteredSchools = schools.filter((school) =>
        school.school_name.toLowerCase().includes(query.toLowerCase())
      );

      // Set the filtered schools array as the results state
      setResults(filteredSchools);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching search results");
      setResults([]);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            <strong>{result.school_name}</strong> - {result.neighborhood}
            {/* You can add more details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
