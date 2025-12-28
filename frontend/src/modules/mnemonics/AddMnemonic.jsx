import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MnemonicsList.css"; // Reuse the same CSS

const AddMnemonic = () => {
  const [title, setTitle] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [details, setDetails] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !mnemonic || !details) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const tagsArr = tags.split(",").map(t => t.trim()).filter(Boolean);
      const res = await fetch("http://localhost:5000/api/mnemonics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, mnemonic, details, tags: tagsArr }),
      });
      if (!res.ok) throw new Error("Failed to add mnemonic");
      navigate("/mnemonics");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mnemonic-list-bg">
      <div className="mnemonic-list-container">
        <div className="mnemonic-list-header">
          <h2 className="mnemonic-list-title">Add New Mnemonic</h2>
        </div>

        {error && (
          <div style={{ color: "#ff4d4f", marginBottom: "1rem", padding: "0.8rem", background: "#fff2f0", borderRadius: "8px" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#3a2d5c" }}>Title *</label>
            <input
              type="text"
              placeholder="Enter mnemonic title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mnemonic-search"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#3a2d5c" }}>Mnemonic *</label>
            <input
              type="text"
              placeholder="Enter the mnemonic (e.g., PEMDAS)"
              value={mnemonic}
              onChange={(e) => setMnemonic(e.target.value)}
              className="mnemonic-search"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#3a2d5c" }}>Details *</label>
            <textarea
              placeholder="Enter detailed explanation"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mnemonic-search"
              style={{ width: "100%", minHeight: "120px", fontFamily: "inherit" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#3a2d5c" }}>Tags (optional)</label>
            <input
              type="text"
              placeholder="Enter tags separated by commas (e.g., math, science)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mnemonic-search"
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button
              type="submit"
              className="mnemonic-add-btn"
              disabled={loading}
              style={{ flex: 1 }}
            >
              {loading ? "Adding..." : "Add Mnemonic"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/mnemonics")}
              className="mnemonic-cancel-btn"
              style={{ flex: 1 }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMnemonic;