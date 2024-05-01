import React from "react";

const Question = ({ question, choices, onSelect }) => {
  return (
    <div>
      <h2>{question}</h2>
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onSelect(choice)}>
          {choice}
        </button>
      ))}
    </div>
  );
};

export default Question;
