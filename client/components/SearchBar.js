import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      // Trigger the search after a delay of 500 milliseconds
      if (query !== prevQuery) {
        onSearch(query);
        setPrevQuery(query);
      }
    }, 500);

    return () => clearTimeout(delayTimer); // Clear the timer on component unmount or query/searchType change
  }, [query, onSearch, prevQuery]);

  const handleChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
  };

  return (
    <div className="my-12 text-center">
      <div className="flex items-center justify-center">
        <input
          type="text"
          className="w-full py-2 px-4 outline-none rounded-l-md border border-blue-500 mr-2"
          placeholder={`Search by school...`}
          value={query}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;

