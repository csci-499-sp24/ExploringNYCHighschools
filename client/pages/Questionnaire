import React, { useState, useEffect } from "react";
import Question from "../components/Question";

const Questionnaire = () => {
  const questions = [
    {
      text: "Which borough do you live in?",
      choices: ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Is"],
    },
    {
      text: "NYC Deparment of Education require students to learn a second language other than English. Which language are you interested in?",
      choices: ["Spanish", "French", "Mandarin"],
    },
    {
      text: "What are you interested in?",
      choices: [
        "Arts and Humanities",
        "STEM (Science, Technology, Engineering, and Mathematics)",
        "Social Sciences",
        "Business and Economics",
        "Health and Wellness",
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [schools, setSchools] = useState([]);
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);

  const handleResponse = (choice) => {
    setResponses({ ...responses, [currentQuestionIndex]: choice });
    console.log(choice);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const fetchSchools = async () => {
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/question`;

      const params = new URLSearchParams();

      if (responses[0]) {
        params.append("borough", responses[0]);
      }
      if (responses[1]) {
        params.append("languages", responses[1]);
      }
      if (responses[2]) {
        // Map user's selected category to the interests present in "interest1"
        const categoryInterests = {
          "Arts and Humanities": [
            "Arts",
            "Humanities",
            "Visual Arts",
            "Performing Arts",
            "Visual Art & Design",
            "Film/Video",
          ],
          "STEM (Science, Technology, Engineering, and Mathematics)": [
            "Engineering",
            "Computer Science & Technology",
            "Science & Math",
          ],
          "Social Sciences": ["Law & Government"],
          "Business and Economics": ["Business"],
          "Health and Wellness": [
            "Health Professions",
            "Culinary Arts",
            "Hospitality, Travel, & Tourism",
          ],
        };

        const selectedCategoryInterests = categoryInterests[responses[2]];
        if (selectedCategoryInterests) {
          params.append("interests", selectedCategoryInterests.join(";"));
        }
      }

      if (params.toString().length > 0) {
        url += `?${params.toString()}`;
      }

      console.log(url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("Fetched schools data:", data);
      setSchools(data.schools);
    } catch (error) {
      console.error("Error fetching schools data:", error);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      fetchSchools();
    }
  }, [currentQuestionIndex]);

  const restartQuestionnaire = () => {
    setCurrentQuestionIndex(0);
    setResponses({});
    setSchools([]);
    setQuestionnaireCompleted(false);
  };

  useEffect(() => {
    if (currentQuestionIndex === questions.length) {
      fetchSchools();
      setQuestionnaireCompleted(true);
    }
  }, [currentQuestionIndex]);

  return (
    <div className="container">
      {" "}
      <div className="question-indicators">
        {questions.map((_, index) => (
          <span
            key={index}
            className={currentQuestionIndex === index ? "active" : ""}
          >
            Question {index + 1}
          </span>
        ))}
      </div>
      {currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex].text}
          choices={questions[currentQuestionIndex].choices}
          onSelect={handleResponse}
        />
      ) : (
        <div>
          <h2>Thank you for completing the questionnaire!</h2>
          <button onClick={restartQuestionnaire}>Restart</button>
          <div>
            <h3>Schools Matching Your Criteria:</h3>
            <ul>
              {schools &&
                schools.map((school, index) => (
                  <li key={index}>
                    {school.school_name} - {school.languages} -{" "}
                    {school.interest1}
                  </li>
                ))}
              {!schools && <li>No schools found</li>}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionnaire;
