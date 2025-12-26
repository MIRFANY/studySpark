const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Temporary in-memory mnemonics data
let mnemonics = [
  {
    id: 1,
    title: "Causes of Microcytic Anemia",
    mnemonic: "TICS",
    details: "Thalassemia, Iron deficiency, Chronic disease, Sideroblastic anemia."
  },
  {
    id: 2,
    title: "Cranial Nerves",
    mnemonic: "On Old Olympus Towering Top...",
    details: "Olfactory, Optic, Oculomotor, Trochlear, Trigeminal, Abducens, Facial, Vestibulocochlear, Glossopharyngeal, Vagus, Accessory, Hypoglossal."
  }
];

// Get all mnemonics
app.get('/api/mnemonics', (req, res) => {
  res.json(mnemonics);
});

// Get mnemonic by id
app.get('/api/mnemonics/:id', (req, res) => {
  const id = Number(req.params.id);
  const mnemonic = mnemonics.find(m => m.id === id);
  if (!mnemonic) return res.status(404).json({ error: 'Not found' });
  res.json(mnemonic);
});

// Add a new mnemonic
app.post('/api/mnemonics', (req, res) => {
  const { title, mnemonic, details } = req.body;
  if (!title || !mnemonic || !details) {
    return res.status(400).json({ error: 'All fields required' });
  }
  const newMnemonic = {
    id: mnemonics.length ? mnemonics[mnemonics.length - 1].id + 1 : 1,
    title,
    mnemonic,
    details
  };
  mnemonics.push(newMnemonic);
  res.status(201).json(newMnemonic);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
