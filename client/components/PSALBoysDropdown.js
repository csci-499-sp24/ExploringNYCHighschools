import React, { useState, useEffect } from "react";
import Select from "react-select";

function PSALBoysDropdown({ setSelectedPSALBoys }) {
  const [psalBoys, setPSALBoys] = useState([]);

  useEffect(() => {
    async function loadPSALBoys() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        const data = await response.json();
        const schools = data.schools;

        // Extract all PSAL boys sports
        const allPSALBoys = schools.reduce((acc, school) => {
          const sports = school.psal_boys
            ? school.psal_boys.split(",").map((sport) => sport.trim())
            : [];
          return acc.concat(sports);
        }, []);

        // Remove empty values and duplicates
        const uniquePSALBoys = Array.from(
          new Set(allPSALBoys.filter((sport) => sport))
        );

        setPSALBoys(
          uniquePSALBoys.map((sport) => ({ label: sport, value: sport }))
        );
      } catch (error) {
        console.error("Error fetching unique PSAL boys sports:", error);
        setPSALBoys([]);
      }
    }

    loadPSALBoys();
  }, []);

  const handlePSALBoysChange = (selectedOptions) => {
    // Update selected PSAL boys sports state
    setSelectedPSALBoys(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div>
      <Select
        isMulti
        instanceId="long-value-select"
        options={psalBoys}
        onChange={handlePSALBoysChange}
        placeholder="Select a PSAL boys sport"
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

export default PSALBoysDropdown;
