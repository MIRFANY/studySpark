import React, { useState } from "react";

const scenarios = {
  medical: [
    {
      question:
        "A 65-year-old man presents with chest pain radiating to the left arm, sweating, and shortness of breath. What is the most likely diagnosis?",
      answer: "Acute myocardial infarction (heart attack).",
    },
    {
      question:
        "A young woman presents with weight loss, heat intolerance, and exophthalmos. What is the likely diagnosis?",
      answer: "Graves' disease (hyperthyroidism).",
    },
  ],
  engineering: [
    {
      question:
        "You are given a bug report: 'App crashes when user uploads a file larger than 10MB.' What is your first step?",
      answer:
        "Reproduce the bug, check file upload size limits in backend and frontend, and review error logs.",
    },
    {
      question: "What is the time complexity of binary search?",
      answer: "O(log n)",
    },
  ],
  management: [
    {
      question:
        "A project is behind schedule due to resource constraints. What should a manager do first?",
      answer:
        "Assess resource allocation, communicate with stakeholders, and re-prioritize tasks if needed.",
    },
    {
      question: "How do you handle conflict between two team members?",
      answer:
        "Facilitate a private discussion, listen to both sides, and work towards a collaborative solution.",
    },
  ],
};

const sectionNames = {
  medical: "Medical Cases",
  engineering: "Engineering (Software)",
  management: "Management",
};

const PracticeScenarios = () => {
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
    <div className="mnemonic-detail" style={{ textAlign: "center" }}>
      <h2>Practice Scenarios</h2>
      <div style={{ marginBottom: "1.5rem" }}>
        {Object.keys(sectionNames).map((key) => (
          <button
            key={key}
            onClick={() => {
              setSection(key);
              setCurrent(0);
              setShowAnswer(false);
            }}
            style={{
              marginRight: "1rem",
              padding: ".5rem 1.2rem",
              fontWeight: section === key ? 700 : 400,
              background: section === key ? "#2a4d69" : "#f7f8fa",
              color: section === key ? "#fff" : "#2a4d69",
              border: "none",
              borderRadius: "6px",
            }}
          >
            {sectionNames[key]}
          </button>
        ))}
      </div>
      <div
        style={{
          margin: "2rem auto",
          padding: "2rem",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          maxWidth: "500px",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          {currentCase.question}
        </div>
        {showAnswer ? (
          <div style={{ margin: "1rem 0", color: "#222" }}>
            <strong>Answer:</strong> {currentCase.answer}
          </div>
        ) : (
          <button
            onClick={() => setShowAnswer(true)}
            style={{ padding: ".6rem 1.5rem", fontSize: "1rem" }}
          >
            Show Answer
          </button>
        )}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <button
          onClick={prevCase}
          style={{ marginRight: "1rem", padding: ".5rem 1.2rem" }}
        >
          Previous
        </button>
        <button onClick={nextCase} style={{ padding: ".5rem 1.2rem" }}>
          Next
        </button>
      </div>
      <div style={{ marginTop: "1rem", color: "#888" }}>
        Case {current + 1} of {cases.length}
      </div>
    </div>
  );
};

export default PracticeScenarios;
