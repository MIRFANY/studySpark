import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MnemonicsList.css"; // Reuse the same CSS

const tagColors = ["#7c3aed", "#2bd2ff", "#ffd600", "#4caf50", "#ff9800"];

const MnemonicDetail = () => {
  const { id } = useParams();
  const [mnemonic, setMnemonic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/mnemonics/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setMnemonic(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="mnemonic-list-bg">
        <div className="mnemonic-list-container">
          <p style={{ textAlign: "center", color: "#888" }}>Loading...</p>
        </div>
      </div>
    );

  if (error || !mnemonic)
    return (
      <div className="mnemonic-list-bg">
        <div className="mnemonic-list-container">
          <p style={{ textAlign: "center", color: "#ff4d4f" }}>Mnemonic not found.</p>
          <Link to="/mnemonics" className="mnemonic-add-btn" style={{ display: "block", textAlign: "center", marginTop: "1rem" }}>
            Back to Mnemonics
          </Link>
        </div>
      </div>
    );

  return (
    <div className="mnemonic-list-bg">
      <div className="mnemonic-list-container">
        <div className="mnemonic-list-header">
          <div className="mnemonic-list-title">{mnemonic.title}</div>
          <Link to="/mnemonics" className="mnemonic-add-btn" style={{ background: "#2bd2ff" }}>
            ← Back
          </Link>
        </div>

        <div className="mnemonic-card" style={{ marginTop: "2rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#7c3aed", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Mnemonic</h3>
            <div className="mnemonic-card-mnemonic" style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              {mnemonic.mnemonic}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <h3 style={{ color: "#7c3aed", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Details</h3>
            <div className="mnemonic-card-details" style={{ lineHeight: "1.6" }}>
              {mnemonic.details}
            </div>
          </div>

          {mnemonic.tags && mnemonic.tags.length > 0 && (
            <div style={{ marginTop: "1.5rem" }}>
              <h3 style={{ color: "#7c3aed", marginBottom: "0.5rem", fontSize: "1.1rem" }}>Tags</h3>
              <div className="mnemonic-card-tags">
                {mnemonic.tags.map((tag, i) => (
                  <span
                    className="mnemonic-tag"
                    style={{ background: tagColors[i % tagColors.length] }}
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MnemonicDetail;