import React, { useState, useEffect } from "react";
import Select from "react-select";

function NeighborhoodDropdown({ setSelectedNeighborhood }) {
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    async function loadNeighborhoods() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        const data = await response.json();
        const schools = data.schools;
        const uniqueNeighborhoods = Array.from(
          new Set(schools.map((school) => school.neighborhood))
        );

        // Add "All" option at the beginning
        setNeighborhoods(["Any neighborhood"].concat(uniqueNeighborhoods));
      } catch (error) {
        console.error("Error fetching unique neighborhoods:", error);
        setNeighborhoods([]);
      }
    }

    loadNeighborhoods();
  }, []);

  const handleNeighborhoodChange = (selectedOption) => {
    setSelectedNeighborhood(
      selectedOption.value === "Any neighborhood" ? null : selectedOption.value
    );
  };

  return (
    <div>
      <Select
        id="neighborhood"
        instanceId="long-value-select"
        options={neighborhoods.map((neighborhood) => ({
          value: neighborhood,
          label: neighborhood,
        }))}
        onChange={handleNeighborhoodChange}
        placeholder="Select a neighborhood"
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

export default NeighborhoodDropdown;
