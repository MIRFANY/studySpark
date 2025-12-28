const express = require('express');
const router = express.Router();
const Mnemonic = require('../models/Mnemonic');

//Get all mnemonics
router.get('/',async (req,res) =>{
    try{
        const mnemonics = await Mnemonic.findAll();
        res.json(mnemonics);
    } catch( err) {
        res.status(500).json({ error: 'Failed to fetch menmonics'});
    }
});

// Get mnemonic by id

// Get mnemonic by id
router.get('/:id', async (req, res) => {
  try {
    const mnemonic = await Mnemonic.findByPk(req.params.id);
    if (!mnemonic) return res.status(404).json({ error: 'Not found' });
    res.json(mnemonic);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch mnemonic' });
  }
});

// Add a new mnemonic
router.post('/', async (req, res) => {
  const { title, mnemonic, details, tags } = req.body;
  if (!title || !mnemonic || !details) {
    return res.status(400).json({ error: 'All fields required' });
  }
  try {
    const newMnemonic = await Mnemonic.create({ title, mnemonic, details, tags });
    res.status(201).json(newMnemonic);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create mnemonic' });
  }
});



// Update a mnemonic
router.put('/:id', async (req, res) => {
  const { title, mnemonic, details, tags } = req.body;
  try {
    const [updated] = await Mnemonic.update(
      { title, mnemonic, details, tags },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedMnemonic = await Mnemonic.findByPk(req.params.id);
      return res.json(updatedMnemonic);
    }
    res.status(404).json({ error: 'Mnemonic not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update mnemonic' });
  }
});




// Delete a mnemonic
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Mnemonic.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Mnemonic deleted' });
    }
    res.status(404).json({ error: 'Mnemonic not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mnemonic' });
  }
});

module.exports = router;