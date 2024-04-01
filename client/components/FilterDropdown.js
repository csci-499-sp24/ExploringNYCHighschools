import React from "react";

const FilterDropdown = ({ label, options, onSelect }) => {
  return (
    <div>
      <label>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select {label}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
