import React, { useState, useEffect } from "react";
import Link from "next/link";

const RecommendSchool = () => {
  const [schools, setSchools] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("");
  const [selectedCollegeCareerRate, setSelectedCollegeCareerRate] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [filteredSchools, setFilteredSchools] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const questions = [
    "Which borough are you most interested in?",
    "Which category of studies are you most interested in?",
    "On a scale of 1 to 5, how likely are you to attend college?",
    "Which language are you most interested in?",
    "What sport are you most interested in?",
  ];

  const categoryInterests = {
    "Arts and Humanities": [
      "Performing Arts",
      "Architecture",
      "Humanities & Interdisciplinary",
      "Culinary Arts",
      "Film/Video",
      "Visual Arts",
      "Communications",
      "Law & Government",
    ],
    "STEM (Science, Technology, Engineering, and Mathematics)": [
      "Engineering",
      "Computer Science & Technology",
      "Science & Math",
      "Project-Based Learning",
      "Environmental Science",
    ],
    "Social Sciences": ["Law & Government", "Teaching"],
    "Business and Economics": ["Business"],
    "Health and Wellness": [
      "Health Professions",
      "Culinary Arts",
      "Hospitality, Travel, & Tourism",
    ],
  };

  const boroughs = [
    { name: "Manhattan", value: "MANHATTAN" },
    { name: "Brooklyn", value: "BROOKLYN" },
    { name: "Queens", value: "QUEENS" },
    { name: "The Bronx", value: "BRONX" },
    { name: "Staten Island", value: "STATEN IS" },
  ];

  const languages = [
    "Bengali",
    "Latin",
    "Spanish",
    "Albanian",
    "Korean",
    "German",
    "Cantonese",
    "Hindi",
    "Italian",
    "American Sign Language",
    "Russian",
    "Arabic",
    "Hebrew",
    "Punjabi",
    "Greek",
    "Mandarin",
    "Haitian Creole",
    "Portuguese",
    "French",
    "Japanese",
    "Polish",
  ];

  const sports = [
    "Badminton",
    "Baseball",
    "Basketball",
    "Bowling",
    "Cross Country",
    "Fencing",
    "Flag Football",
    "Football",
    "Golf",
    "Gymnastics",
    "Handball",
    "Indoor Track",
    "Lacrosse",
    "Outdoor Track",
    "Rugby",
    "Soccer",
    "Softball",
    "Swimming",
    "Table Tennis",
    "Tennis",
    "Volleyball",
    "Wrestling",
  ];

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_SERVER_URL + "/api/schools")
      .then((response) => response.json())
      .then((data) => {
        setSchools(data.schools);
      })
      .catch((error) => {
        console.error("Error fetching schools:", error);
      });
  }, []);

  useEffect(() => {
    if (
      selectedBorough ||
      selectedCategory ||
      selectedCollegeCareerRate ||
      selectedLanguage ||
      selectedSports
    ) {
      const filtered = schools.filter((school) => {
        if (!school.interest1) return false;

        const interests = school.interest1.split(";");
        const meetsCategory =
          !selectedCategory ||
          interests.some((interest) =>
            categoryInterests[selectedCategory].includes(interest.trim())
          );
        const meetsBorough =
          !selectedBorough || school.borough.toUpperCase() === selectedBorough;
        const meetsCollegeCareerRate =
          !selectedCollegeCareerRate ||
          parseFloat(school.college_career_rate) >= selectedCollegeCareerRate;
        const meetsLanguage =
          !selectedLanguage ||
          (school.languages && school.languages.includes(selectedLanguage));
        const meetsSports =
          !selectedSports ||
          (school.psal_boys && school.psal_boys.includes(selectedSports)) ||
          (school.psal_girls && school.psal_girls.includes(selectedSports));

        return (
          meetsCategory &&
          meetsBorough &&
          meetsCollegeCareerRate &&
          (meetsLanguage || meetsSports)
        );
      });

      const sorted = filtered.sort((a, b) => b.grad_rate - a.grad_rate);

      setFilteredSchools(sorted);
    } else {
      setFilteredSchools([]);
    }
  }, [
    selectedCategory,
    selectedBorough,
    selectedCollegeCareerRate,
    selectedLanguage,
    selectedSports,
    schools,
  ]);

  const handleAnswer = (answer) => {
    switch (questionIndex) {
      case 0:
        setSelectedBorough(answer);
        setQuestionIndex(1);
        break;
      case 1:
        setSelectedCategory(answer);
        setQuestionIndex(2);
        break;
      case 2:
        setSelectedCollegeCareerRate(getThreshold(answer));
        setQuestionIndex(3);
        break;
      case 3:
        setSelectedLanguage(answer);
        setQuestionIndex(4);
        break;
      case 4:
        setSelectedSports(answer);
        setQuestionIndex(5);
        break;
      default:
        break;
    }
  };

  const resetFilters = () => {
    setSelectedCategory("");
    setSelectedBorough("");
    setSelectedCollegeCareerRate(0);
    setSelectedLanguage("");
    setSelectedSports("");
    setFilteredSchools([]);
    setQuestionIndex(0);
  };

  const getThreshold = (answer) => {
    switch (parseInt(answer)) {
      case 1:
        return 0.4;
      case 2:
        return 0.5;
      case 3:
        return 0.6;
      case 4:
        return 0.7;
      case 5:
        return 0.8;
      default:
        return 0;
    }
  };

  return (
    <div className="background-color">
      <div className="container">
        <div className="question-indicators">
          {questions.map((_, index) => (
            <span
              key={index}
              className={questionIndex === index ? "active" : ""}
              style={{ fontWeight: "bold" }}
            >
              Question {index + 1}
            </span>
          ))}
        </div>
        {questionIndex <= 4 && <h3>{questions[questionIndex]}</h3>}
        {questionIndex === 0 && (
          <div>
            {boroughs.map((borough) => (
              <button
                className="question-button"
                key={borough.value}
                onClick={() => handleAnswer(borough.value)}
              >
                {borough.name}
              </button>
            ))}
          </div>
        )}
        {questionIndex === 1 && (
          <div>
            {Object.keys(categoryInterests).map((category) => (
              <button
                className="question-button"
                key={category}
                onClick={() => handleAnswer(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        {questionIndex === 2 && (
          <div>
            {[1, 2, 3, 4, 5].map((rate) => (
              <button
                key={rate}
                onClick={() => handleAnswer(rate)}
                style={{
                  backgroundColor:
                    rate === 1
                      ? "green"
                      : rate === 2
                      ? "lightgreen"
                      : rate === 3
                      ? "#FFD700"
                      : rate === 4
                      ? "orange"
                      : "red",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  margin: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {rate}
              </button>
            ))}
          </div>
        )}
        {questionIndex === 3 && (
          <div>
            {languages.map((language) => (
              <button
                className="question-button"
                key={language}
                onClick={() => handleAnswer(language)}
              >
                {language}
              </button>
            ))}
          </div>
        )}
        {questionIndex === 4 && (
          <div>
            {sports.map((sport) => (
              <button
                className="question-button"
                key={sport}
                onClick={() => handleAnswer(sport)}
              >
                {sport}
              </button>
            ))}
          </div>
        )}
        {questionIndex > 4 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3>You have completed the questionnaire!</h3>
            <button className="question-button" onClick={resetFilters}>
              Reset
            </button>
          </div>
        )}
        {questionIndex > 4 && (
          <ul>
            <h3>Schools we recommended:</h3>
            {filteredSchools.map((school, index) => (
              <li key={index} className="school-item">
                <div>
                  <strong>School Name:</strong>{" "}
                  <Link href={`/schools/${school.dbn}`}>{school.school_name}</Link>
                </div>
                <div>
                  <strong>Borough:</strong> {school.borough}
                </div>
                <div>
                  <strong>Interest:</strong> {school.interest1}
                </div>
                <div>
                  <strong>Languages:</strong> {school.languages}
                </div>
                <div>
                  <strong>PSAL Boys:</strong> {school.psal_boys}
                </div>
                <div>
                  <strong>PSAL Girls:</strong> {school.psal_girls}
                </div>
                <div>
                  <strong>College Career Rate:</strong>
                  {school.college_career_rate}
                </div>
                <div>
                  <strong>Graduation Rate:</strong> {school.grad_rate}
                </div>
              </li>
            ))}
            {!filteredSchools ||
              (filteredSchools.length === 0 && (
                <li>No schools fit your criteria!</li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RecommendSchool;
