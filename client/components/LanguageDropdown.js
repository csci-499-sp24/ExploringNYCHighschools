import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const LanguageDropdown = ({ onSelect }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    fetchLanguages();
  }, []);

  const fetchLanguages = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/languages`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch languages");
      }
      const data = await response.json();
      setLanguages(data);
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
  };

  return (
    <FilterDropdown label="Languages" options={languages} onSelect={onSelect} />
  );
};

export default LanguageDropdown;
