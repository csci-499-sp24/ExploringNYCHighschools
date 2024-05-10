import React, { useState, useEffect } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

const MapSearchBar = ({ schools, setSelectedSchool }) => {
  const [query, setQuery] = useState('');
  const [filteredSchools, setFilteredSchools] = useState([]);

  useEffect(() => {
    setFilteredSchools(schools);
  }, [schools]);

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
  return (
    <div className="searchbar-map">
        <Typeahead
        labelKey="school_name"
        options={filteredSchools}
        onSearch={(query) => handleSearch(query)}
        placeholder="Search by school name..."
        onChange={(selected) => handleSelectedSchool(selected)}
        />
    </div>
  );
};

export default MapSearchBar;
