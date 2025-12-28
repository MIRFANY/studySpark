import React, { useEffect, useState } from "react";
import "./ProgressTracker.css";

export default function ProgressTracker() {
  const [mnemonicsCount, setMnemonicsCount] = useState(0);
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/mnemonics")
      .then(res => res.json())
      .then(data => setMnemonicsCount(data.length))
      .catch(() => setMnemonicsCount(0));
    setFlashcardsReviewed(Number(localStorage.getItem("flashcardsReviewed") || 0));
    const planner = JSON.parse(localStorage.getItem("studyPlannerTasks") || "[]");
    setTasksCompleted(planner.filter(t => t.done).length);
  }, []);

  // For demo, calculate fake mastery percent
  const mastery = mnemonicsCount ? Math.min(100, Math.round((flashcardsReviewed / mnemonicsCount) * 100)) : 0;

  return (
    <div className="progress-bg">
      <div className="progress-container">
        <h2 className="progress-title">Progress Tracker</h2>
        <div className="progress-section">
          <div className="progress-label">Total Mnemonics</div>
          <div className="progress-value">{mnemonicsCount}</div>
        </div>
        <div className="progress-section">
          <div className="progress-label">Flashcards Reviewed</div>
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${mastery}%` }} />
          </div>
          <div className="progress-value">{flashcardsReviewed} <span className="progress-percent">({mastery}%)</span></div>
        </div>
        <div className="progress-section">
          <div className="progress-label">Study Tasks Completed</div>
          <div className="progress-value">{tasksCompleted}</div>
        </div>
        <div className="progress-note">
          (Progress is tracked locally for now. More detailed stats and charts can be added later!)
        </div>
      </div>
    </div>
  );
}
