import React, { useState } from "react";
import "./PracticeScenarios.css";

const scenarios = {
  medical: [
    {
      question:
        "A 65-year-old man presents with chest pain radiating to the left arm, sweating, and shortness of breath. What is the most likely diagnosis?",
      answer: "Acute myocardial infarction (heart attack).",
      video: "https://www.youtube.com/embed/3cQIPj66Fv8",
    },
    {
      question:
        "A young woman presents with weight loss, heat intolerance, and exophthalmos. What is the likely diagnosis?",
      answer: "Graves' disease (hyperthyroidism).",
      video: "https://www.youtube.com/embed/3cQIPj66Fv8",
    },
  ],
  engineering: [
    {
      question:
        "You are given a bug report: 'App crashes when user uploads a file larger than 10MB.' What is your first step?",
      answer:
        "Reproduce the bug, check file upload size limits in backend and frontend, and review error logs.",
      video: "https://www.youtube.com/embed/8hly31xKli0",
    },
    {
      question: "What is the time complexity of binary search?",
      answer: "O(log n)",
      video: "https://www.youtube.com/embed/8hly31xKli0",
    },
  ],
  management: [
    {
      question:
        "A project is behind schedule due to resource constraints. What should a manager do first?",
      answer:
        "Assess resource allocation, communicate with stakeholders, and re-prioritize tasks if needed.",
      video: "https://www.youtube.com/embed/NU7W7qe2R0A",
    },
    {
      question: "How do you handle conflict between two team members?",
      answer:
        "Facilitate a private discussion, listen to both sides, and work towards a collaborative solution.",
      video: "https://www.youtube.com/embed/NU7W7qe2R0A",
    },
  ],
};

const sectionNames = {
  medical: "Medical Cases",
  engineering: "Engineering (Software)",
  management: "Management",
};

export default function PracticeScenarios() {
  const [section, setSection] = useState("medical");
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const cases = scenarios[section];
  const currentCase = cases[current];

  const nextCase = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev + 1) % cases.length);
  };
  const prevCase = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <div className="practice-bg">
      <div className="practice-container">
        <h2 className="practice-title">Practice Scenarios</h2>
        <div className="practice-tabs">
          {Object.keys(sectionNames).map((key) => (
            <button
              key={key}
              className={`practice-tab${section === key ? " active" : ""}`}
              onClick={() => {
                setSection(key);
                setCurrent(0);
                setShowAnswer(false);
              }}
            >
              {sectionNames[key]}
            </button>
          ))}
        </div>
        <div className="practice-card">
          {currentCase.video && (
            <iframe
              className="practice-video"
              src={currentCase.video}
              title="Scenario Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
          <div className="practice-question">{currentCase.question}</div>
          {showAnswer ? (
            <div className="practice-answer">{currentCase.answer}</div>
          ) : (
            <button
              className="practice-show-btn"
              onClick={() => setShowAnswer(true)}
            >
              Show Answer
            </button>
          )}
        </div>
        <div className="practice-nav">
          <button onClick={prevCase}>Previous</button>
          <button onClick={nextCase}>Next</button>
        </div>
        <div className="practice-case-count">
          Case {current + 1} of {cases.length}
        </div>
      </div>
    </div>
  );
}
