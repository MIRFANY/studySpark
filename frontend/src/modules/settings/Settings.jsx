import React, { useState } from "react";
import "./Settings.css";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Alex",
    email: "alex@email.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  });
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="settings-bg">
      <div className="settings-container">
        <h2 className="settings-title">Settings</h2>
        <section className="settings-section">
          <h3>Profile</h3>
          <div className="settings-profile">
            <img
              src={profile.avatar}
              alt="avatar"
              className="settings-avatar"
            />
            <div>
              <div className="settings-label">Name</div>
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
              <div className="settings-label">Email</div>
              <input
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>
          </div>
        </section>
        <section className="settings-section">
          <h3>Theme</h3>
          <div className="settings-theme">
            <label>
              <input
                type="radio"
                checked={theme === "dark"}
                onChange={() => setTheme("dark")}
              />
              Dark
            </label>
            <label>
              <input
                type="radio"
                checked={theme === "light"}
                onChange={() => setTheme("light")}
              />
              Light
            </label>
          </div>
        </section>
        <section className="settings-section">
          <h3>Notifications</h3>
          <label className="settings-switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <span className="settings-slider" />
            Enable notifications
          </label>
        </section>
      </div>
    </div>
  );
}
