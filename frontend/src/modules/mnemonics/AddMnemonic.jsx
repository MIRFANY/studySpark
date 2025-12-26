import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddMnemonic = () => {
  const [title, setTitle] = useState("");
  const [mnemonic, setMnemonic] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/mnemonics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, mnemonic, details }),
      });
      if (!res.ok) throw new Error("Failed to add mnemonic");
      setLoading(false);
      navigate("/mnemonics");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="mnemonic-detail">
      <h2>Add New Mnemonic</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: ".5rem", fontSize: "1rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Mnemonic"
            value={mnemonic}
            onChange={(e) => setMnemonic(e.target.value)}
            required
            style={{ width: "100%", padding: ".5rem", fontSize: "1rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="Details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            rows={4}
            style={{ width: "100%", padding: ".5rem", fontSize: "1rem" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ padding: ".6rem 1.5rem", fontSize: "1rem" }}
        >
          {loading ? "Adding..." : "Add Mnemonic"}
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default AddMnemonic;
