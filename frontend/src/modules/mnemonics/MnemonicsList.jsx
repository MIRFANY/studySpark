import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MnemonicsList = () => {
  const [mnemonics, setMnemonics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/mnemonics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMnemonics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="mnemonic-list">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="mnemonic-list">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="mnemonic-list">
      <h2>Mnemonics</h2>
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <Link to="/mnemonics/add" style={{ fontWeight: 600, fontSize: "1rem" }}>
          + Add New
        </Link>
      </div>
      <ul>
        {mnemonics.map((item) => (
          <li key={item.id}>
            <Link to={`/mnemonics/${item.id}`}>
              <span className="mnemonic-title">{item.title}</span> <br />
              <span className="mnemonic-mnemonic">{item.mnemonic}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MnemonicsList;
