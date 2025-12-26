import React, { useState } from "react";

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!topic || !date) {
      setError("Please enter both topic and date.");
      return;
    }
    setTasks([...tasks, { id: Date.now(), topic, date, done: false }]);
    setTopic("");
    setDate("");
    setError(null);
  };

  const markDone = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: true } : task))
    );
  };

  return (
    <div
      className="mnemonic-detail"
      style={{ maxWidth: 500, margin: "2rem auto" }}
    >
      <h2>Study Planner</h2>
      <form onSubmit={handleAddTask} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ width: "60%", padding: ".5rem", marginRight: "1rem" }}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ padding: ".5rem", marginRight: "1rem" }}
        />
        <button type="submit" style={{ padding: ".5rem 1.2rem" }}>
          Add
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
      <h3>Upcoming Tasks</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.filter((t) => !t.done).length === 0 && (
          <li>No upcoming tasks.</li>
        )}
        {tasks
          .filter((t) => !t.done)
          .map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "1rem",
                background: "#f7f8fa",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <strong>{task.topic}</strong> <br />
              <span style={{ color: "#888" }}>{task.date}</span> <br />
              <button
                onClick={() => markDone(task.id)}
                style={{ marginTop: "0.5rem", padding: ".3rem 1rem" }}
              >
                Mark as Done
              </button>
            </li>
          ))}
      </ul>
      <h3>Completed Tasks</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.filter((t) => t.done).length === 0 && (
          <li>No completed tasks.</li>
        )}
        {tasks
          .filter((t) => t.done)
          .map((task) => (
            <li
              key={task.id}
              style={{
                marginBottom: "1rem",
                background: "#e0ffe0",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <strong>{task.topic}</strong> <br />
              <span style={{ color: "#888" }}>{task.date}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default StudyPlanner;
