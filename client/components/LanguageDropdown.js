import React, { useState, useEffect } from "react";
import Select from "react-select";

function LanguageDropdown({ setSelectedLanguage }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    async function loadLanguages() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        const data = await response.json();
        const schools = data.schools;

        // Extract all languages
        const allLanguages = schools.reduce((acc, school) => {
          const languages = school.languages
            ? school.languages.split(",").map((lang) => lang.trim())
            : [];
          return acc.concat(languages);
        }, []);

        // Remove empty values and duplicates
        const uniqueLanguages = Array.from(
          new Set(allLanguages.filter((language) => language))
        );

        // Add "All" option at the beginning
        setLanguages(["Any language"].concat(uniqueLanguages));
      } catch (error) {
        console.error("Error fetching unique languages:", error);
        setLanguages([]);
      }
    }

    loadLanguages();
  }, []);

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(
      selectedOption.value === "Any language" ? null : selectedOption.value
    );
  };

  return (
    <div>
      <Select
        id="language"
        instanceId="long-value-select"
        options={languages.map((language) => ({
          value: language,
          label: language,
        }))}
        onChange={handleLanguageChange}
        placeholder="Select a language"
        styles={{
          // Custom styles for the dropdown
          control: (provided) => ({
            ...provided,
            width: 250, // Adjust the width as needed
          }),
          menu: (provided) => ({
            ...provided,
            width: 300, // Adjust the width of the dropdown menu as needed
            fontSize: "0.8rem", // Optionally adjust the font size of the dropdown menu items
          }),
        }}
      />
    </div>
  );
}

export default LanguageDropdown;
