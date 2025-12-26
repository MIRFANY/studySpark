import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

  if (loading) return <div className="mnemonic-detail"><p>Loading...</p></div>;
  if (error || !mnemonic) return <div className="mnemonic-detail"><p>Mnemonic not found.</p></div>;

  return (
    <div className="mnemonic-detail">
      <h2>{mnemonic.title}</h2>
      <p><strong>Mnemonic:</strong> {mnemonic.mnemonic}</p>
      <p><strong>Details:</strong> {mnemonic.details}</p>
      <Link to="/mnemonics">Back to list</Link>
    </div>
  );
};

export default MnemonicDetail;
