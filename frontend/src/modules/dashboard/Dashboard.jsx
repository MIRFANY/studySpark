import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { FiHome, FiBarChart2, FiBook, FiUsers, FiSettings } from "react-icons/fi";

const features = [
  {
    title: "Mnemonics Genius",
    desc: "Create & Discover Memory Aids",
    color: "#1e3a5c",
    bg: "#e3f0ff",
    btn: "New Mnemonic",
    route: "/mnemonics",
  },
  {
    title: "Study Navigator",
    desc: "Plan Your Learning Journey",
    color: "#2e5d3b",
    bg: "#e6ffe3",
    btn: "Set Schedule",
    route: "/planner",
  },
  {
    title: "Scenario Simulator",
    desc: "Practice Real-World Problems",
    color: "#b88a00",
    bg: "#fffbe3",
    btn: "Start Scenario",
    route: "/practice",
  },
  {
    title: "Flashcard Fortress",
    desc: "Master Key Concepts",
    color: "#7c3aed",
    bg: "#f3e8ff",
    btn: "Review Decks",
    route: "/flashcards/active",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-bg">
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          STUDY <span>SPARK</span>
        </div>
        <nav>
          <button title="Home" className="sidebar-btn active" onClick={() => navigate("/")} >
            🏛️
          </button>
          <button title="Progress" className="sidebar-btn" onClick={() => navigate("/progress")}>
            📈
          </button>
          <button title="Notes" className="sidebar-btn"  onClick={() => navigate("/resources")} >
            📝
          </button>
          <button title="Community" className="sidebar-btn" onClick={() => navigate("/community")} >
            💬
          </button>
          <button title="Settings" className="sidebar-btn" onClick={() => navigate("/settings")}  >
            ⚙️
          </button>
        </nav>
      </aside>
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="dashboard-greeting">
            <h3>
              Hello, <span>Irfan!</span> Ready to learn?
            </h3>
          </div>
          <img
            className="dashboard-avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="User"
          />
        </div>
        <div className="dashboard-cards">
          {features.map((f, i) => (
            <div
              className="dashboard-card"
              
              key={i}
              style={{ background: f.bg, color: f.color }}
            >
              
              <div className="dashboard-card-title">{f.title}</div>
              <div className="dashboard-card-desc">{f.desc}</div>
              <button
                className="dashboard-card-btn"
                style={{ background: f.color, color: "#fff" }}
                onClick={() => navigate(f.route)}
              >
                {f.btn}
              </button>
            </div>
          ))}
        </div>
        <button className="dashboard-quickadd" title="Quick Add">
          ＋
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
