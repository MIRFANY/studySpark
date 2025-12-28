const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');

// Get all flashcards
router.get('/', async (req, res) => {
  try {
    const flashcards = await Flashcard.findAll();
    res.json(flashcards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flashcards' });
  }
});

// Get flashcard by id
router.get('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findByPk(req.params.id);
    if (!flashcard) return res.status(404).json({ error: 'Not found' });
    res.json(flashcard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch flashcard' });
  }
});

// Add a new flashcard
router.post('/', async (req, res) => {
  const { question, answer, tags } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: 'Question and answer are required' });
  }
  try {
    const newFlashcard = await Flashcard.create({ question, answer, tags });
    res.status(201).json(newFlashcard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create flashcard' });
  }
});

// Update a flashcard
router.put('/:id', async (req, res) => {
  const { question, answer, tags } = req.body;
  try {
    const [updated] = await Flashcard.update(
      { question, answer, tags },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedFlashcard = await Flashcard.findByPk(req.params.id);
      return res.json(updatedFlashcard);
    }
    res.status(404).json({ error: 'Flashcard not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update flashcard' });
  }
});

// Delete a flashcard
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Flashcard.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Flashcard deleted' });
    }
    res.status(404).json({ error: 'Flashcard not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete flashcard' });
  }
});

module.exports = router;