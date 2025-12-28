import React, { useState, useEffect } from "react";
import "./StudyPlanner.css";

const StudyPlanner = () => {
  const [tasks, setTasks] = useState([]);
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch tasks");
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Add new task to backend
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!topic || !date) {
      setError("Please enter both topic and date.");
      return;
    }

    fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, date, done: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add task");
        return res.json();
      })
      .then((newTask) => {
        setTasks([...tasks, newTask]);
        setTopic("");
        setDate("");
        setError(null);
      })
      .catch((err) => {
        setError("Failed to add task: " + err.message);
      });
  };

  // Mark task as done in backend
  const markDone = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
      })
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
      })
      .catch((err) => {
        setError("Failed to mark task as done: " + err.message);
      });
  };

  if (loading) {
    return (
      <div className="planner-bg">
        <div className="planner-container">
          <p style={{ textAlign: "center", color: "#888" }}>Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="planner-bg">
      <div className="planner-container">
        <div className="planner-title">Study Planner</div>
        <form onSubmit={handleAddTask} className="planner-input-row">
          <input
            type="text"
            className="planner-input"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <input
            type="date"
            className="planner-input"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit" className="planner-add-btn">
            Add
          </button>
        </form>
        {error && (
          <div style={{ color: "#ff4d4f", marginBottom: "1rem" }}>{error}</div>
        )}
        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Upcoming Tasks
        </h3>
        <ul className="planner-task-list">
          {tasks.filter((t) => !t.done).length === 0 && (
            <li style={{ color: "#888", textAlign: "center" }}>
              No upcoming tasks.
            </li>
          )}
          {tasks
            .filter((t) => !t.done)
            .map((task) => (
              <li className="planner-task" key={task.id}>
                <div>
                  <strong>{task.topic}</strong>
                  <div style={{ color: "#888", fontSize: ".98rem" }}>
                    {task.date}
                  </div>
                </div>
                <button
                  className="planner-add-btn"
                  style={{
                    background: "#43e97b",
                    color: "#fff",
                    padding: ".4rem 1.1rem",
                    fontSize: ".98rem",
                  }}
                  onClick={() => markDone(task.id)}
                >
                  Mark as Done
                </button>
              </li>
            ))}
        </ul>
        <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Completed Tasks
        </h3>
        <ul className="planner-task-list">
          {tasks.filter((t) => t.done).length === 0 && (
            <li style={{ color: "#888", textAlign: "center" }}>
              No completed tasks.
            </li>
          )}
          {tasks
            .filter((t) => t.done)
            .map((task) => (
              <li className="planner-task done" key={task.id}>
                <div>
                  <strong>{task.topic}</strong>
                  <div style={{ color: "#888", fontSize: ".98rem" }}>
                    {task.date}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
  // ...existing code...
};

export default StudyPlanner;
