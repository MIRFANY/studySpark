import React, { useState } from "react";
import "./Resources.css";

const initialResources = [
  {
    id: 1,
    type: "link",
    title: "AnkiWeb - Flashcards",
    url: "https://ankiweb.net/",
    desc: "Popular flashcard app for spaced repetition.",
  },
  {
    id: 2,
    type: "file",
    title: "Neuro Notes PDF",
    url: "#",
    desc: "Comprehensive neuroscience notes.",
  },
];

export default function Resources() {
  const [resources, setResources] = useState(initialResources);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("link");

  const handleAddResource = () => {
    if (title.trim() && url.trim()) {
      setResources([
        {
          id: Date.now(),
          type,
          title,
          url,
          desc,
        },
        ...resources,
      ]);
      setTitle("");
      setUrl("");
      setDesc("");
      setType("link");
    }
  };

  return (
    <div className="resources-bg">
      <div className="resources-container">
        <h2 className="resources-title">Resources</h2>
        <div className="resources-add">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="link">Link</option>
            <option value="file">File</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder={type === "link" ? "URL" : "File URL or Path"}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button onClick={handleAddResource}>Add</button>
        </div>
        <div className="resources-list">
          {resources.map((res) => (
            <div className="resources-item" key={res.id}>
              <div className="resources-item-header">
                <span className={`resources-type resources-type-${res.type}`}>
                  {res.type === "link" ? "🔗" : "📄"}
                </span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resources-item-title"
                >
                  {res.title}
                </a>
              </div>
              <div className="resources-item-desc">{res.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
