import React, { useState, useEffect } from "react";
import Select from "react-select";

function APClassesDropdown({ setSelectedAPClasses }) {
  const [apClasses, setAPClasses] = useState([]);

  useEffect(() => {
    async function loadAPClasses() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        const data = await response.json();
        const schools = data.schools;

        // Extract all AP classes
        const allAPClasses = schools.reduce((acc, school) => {
          const classes = school.ap_classes
            ? school.ap_classes.split(",").map((cls) => cls.trim())
            : [];
          return acc.concat(classes);
        }, []);

        // Remove empty values and duplicates
        const uniqueAPClasses = Array.from(
          new Set(allAPClasses.filter((cls) => cls))
        );

        setAPClasses(
          uniqueAPClasses.map((cls) => ({ label: cls, value: cls }))
        );
      } catch (error) {
        console.error("Error fetching unique AP classes:", error);
        setAPClasses([]);
      }
    }

    loadAPClasses();
  }, []);

  const handleAPClassChange = (selectedOptions) => {
    // Update selected AP classes state
    setSelectedAPClasses(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };

  return (
    <div>
      <Select
        isMulti
        instanceId="long-value-select"
        options={apClasses}
        onChange={handleAPClassChange}
        placeholder="Select an AP class"
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

export default APClassesDropdown;
