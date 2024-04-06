import React, { useState, useEffect, useRef } from "react";

const SearchSchoolBar = ({ onSearch, schools}) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchBarFocused = useRef(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    const filtered_schools= schools.filter(school => 
        school.school_name.toLowerCase().includes(e.target.value.toLowerCase()));
    setSearchResults(filtered_schools);
  };
  const handleSelectedSchool = (school) => {
    setQuery(school.school_name);
    onSearch(school.school_name);
    setSearchResults([]);
  }
  useEffect(() => {
    const handleClickOutsideSearchBar = (e) => {
        if(searchBarFocused.current && !searchBarFocused.current.contains(e.target)) {
            setShowSearchResults(false);
        }
        else {
            setShowSearchResults(true);
        }
    }
    document.addEventListener("click",handleClickOutsideSearchBar);
    return () => {
        document.removeEventListener("click",handleClickOutsideSearchBar);
    }
  }, []);

  return (
    <div>
        <div className="input-group mb-3 compare-search"style={{width: "900px"}}>
            <input
                type="text"
                className="form-control rounded focus-visible:shadow-none"
                placeholder="Search for schools..."
                value={query}
                onChange={handleChange}
                ref={searchBarFocused}
            />
            <div className="row justify-content-center">
                <div className="bg-light border rounded" style={{width: "900px"}}>
                    {searchResults.length > 0 && query!=="" && showSearchResults && (
                        searchResults.map((school,index)=>(
                            <div key={index} style={{padding:"10px", cursor: "pointer"}}onClick={() => handleSelectedSchool(school)}>
                                {school.school_name}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    </div>
    )
};

export default SearchSchoolBar;
