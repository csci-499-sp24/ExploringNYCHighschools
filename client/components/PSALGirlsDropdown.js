import React, { useState, useEffect } from "react";
import Select from "react-select";

function PSALGirlsDropdown({ setSelectedPSALGirls }) {
  const [psalGirls, setPSALGirls] = useState([]);

  useEffect(() => {
    async function loadPSALGirls() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        const data = await response.json();
        const schools = data.schools;

        // Extract all PSAL girls sports
        const allPSALGirls = schools.reduce((acc, school) => {
          const sports = school.psal_girls
            ? school.psal_girls.split(",").map((sport) => sport.trim())
            : [];
          return acc.concat(sports);
        }, []);

        // Remove empty values and duplicates
        const uniquePSALGirls = Array.from(
          new Set(allPSALGirls.filter((sport) => sport))
        );

        setPSALGirls(
          uniquePSALGirls.map((sport) => ({ label: sport, value: sport }))
        );
      } catch (error) {
        console.error("Error fetching unique PSAL girls sports:", error);
        setPSALGirls([]);
      }
    }

    loadPSALGirls();
  }, []);

  const handlePSALGirlsChange = (selectedOptions) => {
    // Update selected PSAL girls sports state
    setSelectedPSALGirls(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div>
      <Select
        isMulti
        instanceId="long-value-select"
        options={psalGirls}
        onChange={handlePSALGirlsChange}
        placeholder="Select a PSAL girls sport"
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

export default PSALGirlsDropdown;
