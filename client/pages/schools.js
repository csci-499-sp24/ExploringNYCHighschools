import React, { useState, useEffect } from "react";
import NeighborhoodDropdown from "../components/NeighborhoodDropdown";
import LanguageDropdown from "../components/LanguageDropdown";
import APClassesDropdown from "@/components/APClassesDropdown";
import Card from "../components/Card";
import SchoolButton from "../components/SchoolButton";
import ScrollUpButton from "../components/ScrollUpButton";
import PSALBoysDropdown from "@/components/PSALBoysDropdown";
import PSALGirlsDropdown from "@/components/PSALGirlsDropdown";
import Favorite from "@/components/Favorite";

function Schools() {
  const [schoolsData, setSchoolsData] = useState([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedAPClasses, setSelectedAPClasses] = useState([]);
  const [selectedPSALBoys, setSelectedPSALBoys] = useState([]);
  const [selectedPSALGirls, setSelectedPSALGirls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schools`;

        const params = new URLSearchParams();

        if (selectedNeighborhood) {
          params.append("neighborhood", selectedNeighborhood);
        }
        if (selectedLanguage) {
          params.append("languages", selectedLanguage);
        }
        if (selectedAPClasses.length > 0) {
          params.append("ap_classes", selectedAPClasses.join(","));
        }
        if (selectedPSALBoys.length > 0) {
          params.append("psal_boys", selectedPSALBoys.join(","));
        }
        if (selectedPSALGirls.length > 0) {
          params.append("psal_girls", selectedPSALGirls.join(","));
        }

        if (params.toString().length > 0) {
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setSchoolsData(data.schools);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching schools data:", error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [
    selectedNeighborhood,
    selectedLanguage,
    selectedAPClasses,
    selectedPSALBoys,
    selectedPSALGirls,
  ]);

  useEffect(() => {
    console.log("Selected Language:", selectedLanguage); // Log selected language whenever it changes
  }, [selectedLanguage]);

  const handleAPClassesChange = (selectedClasses) => {
    setSelectedAPClasses(selectedClasses);
  };
  const handlePSALBoysChange = (selectedPboys) => {
    setSelectedPSALBoys(selectedPboys);
  };
  const handlePSALGirlsChange = (selectedPgirls) => {
    setSelectedPSALGirls(selectedPgirls);
  };

  return (
    <div className="background-color">
      <ScrollUpButton />
      <section id="hero">
        <h1 className="display-1">Explore High Schools</h1>
        <div className="dropdown-container">
          {/* Encircling box for dropdowns */}
          <div className="dropdown-box">
            <div className="dropdowns">
              <NeighborhoodDropdown
                setSelectedNeighborhood={setSelectedNeighborhood}
              />
              <LanguageDropdown setSelectedLanguage={setSelectedLanguage} />
              <APClassesDropdown setSelectedAPClasses={handleAPClassesChange} />
              <PSALBoysDropdown setSelectedPSALBoys={handlePSALBoysChange} />
              <PSALGirlsDropdown setSelectedPSALGirls={handlePSALGirlsChange} />
            </div>
          </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
          <div className="school-wrapper-container">
            {schoolsData &&
              schoolsData.map((school, index) => (
                <div key={index}>
                  <div className="d-flex flex-row bd-highlight mb-3 justify-content-center">
                    <div className="p-2 border flex-fill bd-highlight">
                      <Card data={school} ></Card>
                      <div className="school-button">
                        <SchoolButton link={`/schools/${school.dbn}`} />
                        <SchoolButton
                          link={`/schools/quality-reports/${school.dbn}`}
                          text={"View School Quality Report"}
                        ></SchoolButton>
                         <div style={{position:"relative"}}>
                          <div style={{display:"flex", alignItems:"center", position:"absolute", right:"5px", bottom:"5px"}}>
                            <Favorite data={school}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
          </ul>
        )}
      </section>
    </div>
  );
}

export default Schools;
