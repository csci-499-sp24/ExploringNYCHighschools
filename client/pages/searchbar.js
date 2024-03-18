// components/SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search by school name..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
