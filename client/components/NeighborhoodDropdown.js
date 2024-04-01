import React, { useState, useEffect } from "react";
import FilterDropdown from "./FilterDropdown";

const NeighborhoodDropdown = ({ onSelect }) => {
  const [neighborhoods, setNeighborhoods] = useState([]);

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch schools");
        }
        const schools = await response.json();
        const uniqueNeighborhoods = [
          ...new Set(schools.map((school) => school.neighborhood)),
        ];
        setNeighborhoods(uniqueNeighborhoods);
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      }
    };

    fetchNeighborhoods();
  }, []);

  return (
    <FilterDropdown
      label="Neighborhoods"
      options={neighborhoods}
      onSelect={onSelect}
    />
  );
};

export default NeighborhoodDropdown;
