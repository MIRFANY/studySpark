import React, { useEffect, useState } from "react";

const ProgressTracker = () => {
  const [mnemonicsCount, setMnemonicsCount] = useState(0);
  const [flashcardsReviewed, setFlashcardsReviewed] = useState(0);
  const [tasksCompleted, setTasksCompleted] = useState(0);

  useEffect(() => {
    // Fetch mnemonics count
    fetch("http://localhost:5000/api/mnemonics")
      .then(res => res.json())
      .then(data => setMnemonicsCount(data.length))
      .catch(() => setMnemonicsCount(0));

    // Flashcards reviewed: for now, just use mnemonics count as a placeholder
    setFlashcardsReviewed(Number(localStorage.getItem("flashcardsReviewed") || 0));

    // Study planner tasks completed: get from localStorage (since planner is local only)
    const planner = JSON.parse(localStorage.getItem("studyPlannerTasks") || "[]");
    setTasksCompleted(planner.filter(t => t.done).length);
  }, []);

  return (
    <div className="mnemonic-detail" style={{ maxWidth: 500, margin: "2rem auto" }}>
      <h2>Progress Tracker</h2>
      <ul style={{ listStyle: "none", padding: 0, fontSize: "1.1rem" }}>
        <li><strong>Total Mnemonics:</strong> {mnemonicsCount}</li>
        <li><strong>Flashcards Reviewed:</strong> {flashcardsReviewed}</li>
        <li><strong>Study Tasks Completed:</strong> {tasksCompleted}</li>
      </ul>
      <p style={{ color: '#888', marginTop: '2rem' }}>
        (Progress is tracked locally for now. More detailed stats and charts can be added later!)
      </p>
    </div>
  );
};

export default ProgressTracker;
