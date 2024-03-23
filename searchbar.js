import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("school");

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      // Trigger the search after a delay of 500 milliseconds
      onSearch(query, searchType);
    }, 500);

    return () => clearTimeout(delayTimer); // Clear the timer on component unmount or query/searchType change
  }, [query, searchType, onSearch]);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  const handleSearchTypeChange = (e) => {
    const newSearchType = e.target.value;
    setSearchType(newSearchType);
  };

  return (
    <div className="my-12 text-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-500">
        Exploring High Schools
      </h1>
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="w-full py-2 px-4 outline-none rounded-l-md border border-blue-500 mr-2"
          placeholder={`Search by ${
            searchType === "school"
              ? "school name"
              : searchType === "neighborhood"
              ? "neighborhood"
              : searchType === "languages"
              ? "languages"
              : "AP classes"
          }...`}
          value={query}
          onChange={handleChange}
        />
        <select
          className="py-2 px-4 outline-none border border-blue-500 rounded-r-md"
          value={searchType}
          onChange={handleSearchTypeChange}
        >
          <option value="school">School Name</option>
          <option value="neighborhood">Neighborhood</option>
          <option value="languages">Languages</option>
          <option value="ap_classes">AP Classes</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
