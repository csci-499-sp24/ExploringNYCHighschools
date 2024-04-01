import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const NeighborhoodDropdown = ({ onSelect }) => {
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    fetchNeighborhoods();
  }, []);

  const fetchNeighborhoods = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/neighborhoods`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch neighborhoods");
      }
      const data = await response.json();
      setNeighborhoods(data);
    } catch (error) {
      console.error("Error fetching neighborhoods:", error);
    }
  };

  return (
    <FilterDropdown
      label="Neighborhood"
      options={neighborhoods}
      onSelect={onSelect}
    />
  );
};

export default NeighborhoodDropdown;
