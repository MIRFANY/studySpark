import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../mnemonics/MnemonicsList.css";

const FlashcardDetail = () => {
  const { id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/mnemonics/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setFlashcard(data);
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
          <p>Loading...</p>
        </div>
      </div>
    );
  if (error || !flashcard)
    return (
      <div className="mnemonic-list-bg">
        <div className="mnemonic-list-container">
          <p>Flashcard not found.</p>
        </div>
      </div>
    );

  return (
    <div className="mnemonic-list-bg">
      <div className="mnemonic-list-container">
        <div className="mnemonic-list-header">
          <div className="mnemonic-list-title">{flashcard.title}</div>
          <Link to="/flashcards" className="mnemonic-add-btn" style={{ background: "#2bd2ff" }}>
            Back to Flashcards
          </Link>
        </div>
        <div className="mnemonic-card" style={{ margin: "2rem 0" }}>
          <div className="mnemonic-card-mnemonic">{flashcard.mnemonic}</div>
          <div className="mnemonic-card-details">{flashcard.details}</div>
          {flashcard.tags && (
            <div className="mnemonic-card-tags">
              {flashcard.tags.map((tag, idx) => (
                <span className="mnemonic-tag" style={{ background: "#7c3aed" }} key={idx}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardDetail;
