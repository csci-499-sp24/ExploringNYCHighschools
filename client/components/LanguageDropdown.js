import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const LanguageDropdown = ({ onSelect }) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const schools = await response.json();
        const allLanguages = schools.reduce((acc, school) => {
          if (school.languages) {
            // Check if languages field is not null
            const languages = school.languages
              .split(",")
              .map((lang) => lang.trim());
            return [...acc, ...languages];
          }
          return acc;
        }, []);
        const uniqueLanguages = Array.from(new Set(allLanguages));
        setLanguages(uniqueLanguages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <FilterDropdown label="Languages" options={languages} onSelect={onSelect} />
  );
};

export default LanguageDropdown;
