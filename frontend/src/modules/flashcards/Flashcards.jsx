import React, { useState, useEffect } from "react";

const Flashcards = () => {
  const [mnemonics, setMnemonics] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
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

  const nextCard = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev + 1) % mnemonics.length);
  };
  const prevCard = () => {
    setShowAnswer(false);
    setCurrent((prev) => (prev - 1 + mnemonics.length) % mnemonics.length);
  };

  if (loading) return <div className="mnemonic-detail"><p>Loading...</p></div>;
  if (error) return <div className="mnemonic-detail"><p>Error: {error}</p></div>;
  if (!mnemonics.length) return <div className="mnemonic-detail"><p>No flashcards available.</p></div>;

  const card = mnemonics[current];

  return (
    <div className="mnemonic-detail" style={{ textAlign: "center" }}>
      <h2>Flashcards</h2>
      <div style={{ margin: "2rem auto", padding: "2rem", background: "#fff", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", maxWidth: "400px" }}>
        <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: "1rem" }}>{card.title}</div>
        <div style={{ fontSize: "1.05rem", color: "#888", marginBottom: "1.5rem" }}>{card.mnemonic}</div>
        {showAnswer ? (
          <div style={{ margin: "1rem 0", color: "#222" }}><strong>Details:</strong> {card.details}</div>
        ) : (
          <button onClick={() => setShowAnswer(true)} style={{ padding: ".6rem 1.5rem", fontSize: "1rem" }}>Show Answer</button>
        )}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <button onClick={prevCard} style={{ marginRight: "1rem", padding: ".5rem 1.2rem" }}>Previous</button>
        <button onClick={nextCard} style={{ padding: ".5rem 1.2rem" }}>Next</button>
      </div>
      <div style={{ marginTop: "1rem", color: "#888" }}>
        Card {current + 1} of {mnemonics.length}
      </div>
    </div>
  );
};

export default Flashcards;
