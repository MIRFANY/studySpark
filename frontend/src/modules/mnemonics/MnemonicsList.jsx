import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import "./MnemonicsList.css";

const tagColors = ["#7c3aed", "#2bd2ff", "#ffd600", "#4caf50", "#ff9800"];

const MnemonicsList = () => {
  const [mnemonics, setMnemonics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", mnemonic: "", details: "", tags: "" });
  const [tagFilter, setTagFilter] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/mnemonics")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMnemonics(data.map(m => ({ ...m, tags: m.tags || [] })));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this mnemonic?")) return;
    try {
      await fetch(`http://localhost:5000/api/mnemonics/${id}`, { method: "DELETE" });
      setMnemonics(mnemonics.filter(m => m.id !== id));
    } catch (e) {
      alert("Failed to delete");
    }
  };

  const handleEdit = (mnemonic) => {
    setEditId(mnemonic.id);
    setEditData({
      title: mnemonic.title,
      mnemonic: mnemonic.mnemonic,
      details: mnemonic.details,
      tags: mnemonic.tags ? mnemonic.tags.join(", ") : ""
    });
  };

  const handleEditSave = async () => {
    try {
      const tagsArr = editData.tags.split(",").map(t => t.trim()).filter(Boolean);
      const res = await fetch(`http://localhost:5000/api/mnemonics/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editData, tags: tagsArr })
      });
      if (!res.ok) throw new Error("Failed to update");
      setMnemonics(mnemonics.map(m => m.id === editId ? { ...editData, id: editId, tags: tagsArr } : m));
      setEditId(null);
    } catch (e) {
      alert("Failed to update");
    }
  };

  const filtered = mnemonics.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || m.mnemonic.toLowerCase().includes(search.toLowerCase());
    const matchesTag = !tagFilter || (m.tags && m.tags.includes(tagFilter));
    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(new Set(mnemonics.flatMap(m => m.tags || [])));

  if (loading) return <div className="mnemonic-list"><p>Loading...</p></div>;
  if (error) return <div className="mnemonic-list"><p>Error: {error}</p></div>;

  return (
    <div className="mnemonic-list-bg">
      <div className="mnemonic-list-container">
        <div className="mnemonic-list-header">
          <h2 className="mnemonic-list-title">Mnemonics</h2>
          <Link to="/mnemonics/add" className="mnemonic-add-btn">+ Add New</Link>
        </div>
        <div className="mnemonic-list-controls">
          <input
            className="mnemonic-search"
            placeholder="Search mnemonics..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <div className="mnemonic-tags-filter">
            <span>Filter by tag:</span>
            <select value={tagFilter} onChange={e => setTagFilter(e.target.value)}>
              <option value="">All</option>
              {allTags.map((tag, i) => (
                <option value={tag} key={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mnemonic-cards">
          {filtered.length === 0 && <div className="mnemonic-empty">No mnemonics found.</div>}
          {filtered.map((item, idx) => (
            <div className="mnemonic-card" key={item.id}>
              {editId === item.id ? (
                <div className="mnemonic-edit-form">
                  <input
                    value={editData.title}
                    onChange={e => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Title"
                  />
                  <input
                    value={editData.mnemonic}
                    onChange={e => setEditData({ ...editData, mnemonic: e.target.value })}
                    placeholder="Mnemonic"
                  />
                  <textarea
                    value={editData.details}
                    onChange={e => setEditData({ ...editData, details: e.target.value })}
                    placeholder="Details"
                  />
                  <input
                    value={editData.tags}
                    onChange={e => setEditData({ ...editData, tags: e.target.value })}
                    placeholder="Tags (comma separated)"
                  />
                  <div className="mnemonic-edit-actions">
                    <button onClick={handleEditSave}>Save</button>
                    <button onClick={() => setEditId(null)} className="mnemonic-cancel-btn">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mnemonic-card-header">
                    <div className="mnemonic-card-title">{item.title}</div>
                    <div className="mnemonic-card-actions">
                      <button onClick={() => handleEdit(item)} title="Edit" className="mnemonic-edit-btn">✏️</button>
                      <button onClick={() => handleDelete(item.id)} title="Delete" className="mnemonic-delete-btn">🗑️</button>
                    </div>
                  </div>
                  <div className="mnemonic-card-mnemonic">{item.mnemonic}</div>
                  <div className="mnemonic-card-details">{item.details}</div>
                  <div className="mnemonic-card-tags">
                    {item.tags && item.tags.map((tag, i) => (
                      <span className="mnemonic-tag" style={{ background: tagColors[i % tagColors.length] }} key={tag}>{tag}</span>
                    ))}
                  </div>
                  <button className="mnemonic-view-btn" onClick={() => navigate(`/mnemonics/${item.id}`)}>View</button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MnemonicsList;
