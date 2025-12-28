import React, { useState } from "react";
import "./FlashcardActiveRecall.css";

const sampleDeck = {
  name: "Neuro Mastery Deck",
  mastery: 72,
  cards: [
    {
      front: "What is the function of the hippocampus?",
      back: "Memory formation and spatial navigation.",
    },
    {
      front: "What neurotransmitter is most associated with the reward pathway?",
      back: "Dopamine.",
    },
    {
      front: "Which lobe processes visual information?",
      back: "Occipital lobe.",
    },
  ],
};

export default function FlashcardActiveRecall() {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  const card = sampleDeck.cards[current];
  const total = sampleDeck.cards.length;

  const handleFeedback = (type) => {
    setFlipped(false);
    if (current < total - 1) {
      setCurrent(current + 1);
      setProgress(((current + 1) / total) * 100);
    } else {
      setProgress(100);
    }
  };

  return (
    <div className="far-bg">
      <aside className="far-sidebar">
        <div className="far-deck-title">{sampleDeck.name}</div>
        <div className="far-mastery">
          Mastery Level: <span>{sampleDeck.mastery}%</span>
        </div>
      </aside>
      <main className="far-main">
        <div className="far-progress-bar">
          <div className="far-progress" style={{ width: `${progress}%` }} />
        </div>
        <div
          className={`far-card${flipped ? " flipped" : ""}`}
          onClick={() => setFlipped(!flipped)}
        >
          <div className="far-card-inner">
            <div className="far-card-front">{card.front}</div>
            <div className="far-card-back">{card.back}</div>
          </div>
        </div>
        <div className="far-feedback">
          <button
            className="far-btn far-again"
            onClick={() => handleFeedback("again")}
          >
            Again
          </button>
          <button
            className="far-btn far-hard"
            onClick={() => handleFeedback("hard")}
          >
            Hard
          </button>
          <button
            className="far-btn far-good"
            onClick={() => handleFeedback("good")}
          >
            Good
          </button>
          <button
            className="far-btn far-easy"
            onClick={() => handleFeedback("easy")}
          >
            Easy
          </button>
        </div>
      </main>
    </div>
  );
}