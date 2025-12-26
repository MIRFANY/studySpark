import React, { useState } from "react";
import { FaBook, FaPlus, FaBrain } from "react-icons/fa";
import "./FlashcardFortress.css";

const initialDecks = [
  {
    title: "Creativity Downdown",
    desc: "Neuroscience Flashcards",
  },
  {
    title: "Synaptic Vendibility",
    desc: "Neuroscience Sprint Decks",
  },
  {
    title: "Flowring Nucleated Index",
    desc: "Neuroscience",
  },
];

export default function FlashcardFortress() {
  const [decks, setDecks] = useState(initialDecks);
  const [newDeck, setNewDeck] = useState("");

  const handleAddDeck = () => {
    if (newDeck.trim()) {
      setDecks([...decks, { title: newDeck, desc: "Custom Deck" }]);
      setNewDeck("");
    }
  };

  return (
    <div className="fcf-bg">
      <div className="fcf-header">
        <div>
          <div className="fcf-title">
            Flashcard <span className="fcf-title-highlight">Fortress</span>
          </div>
          <div className="fcf-sub">Master your memory, one deck at a time.</div>
        </div>
        <img
          className="fcf-avatar"
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="User Avatar"
        />
      </div>
      <div className="fcf-main">
        <div className="fcf-decks">
          {decks.map((deck, idx) => (
            <div className="fcf-deck-card" key={idx}>
              <div className="fcf-deck-icon">
                <FaBook />
              </div>
              <div className="fcf-deck-info">
                <div className="fcf-deck-title">{deck.title}</div>
                <div className="fcf-deck-desc">{deck.desc}</div>
              </div>
              <button className="fcf-deck-btn">Open</button>
            </div>
          ))}
        </div>
        <div className="fcf-newdeck">
          <div className="fcf-newdeck-label">Create New Deck</div>
          <input
            className="fcf-newdeck-input"
            type="text"
            placeholder="Deck name..."
            value={newDeck}
            onChange={(e) => setNewDeck(e.target.value)}
          />
          <button className="fcf-newdeck-btn" onClick={handleAddDeck}>
            <FaPlus style={{ marginRight: 8 }} /> Add Deck
          </button>
        </div>
      </div>
      <button className="fcf-review-btn">
        <FaBrain style={{ marginRight: 10, fontSize: "1.3em" }} /> Review All
      </button>
    </div>
  );
}
