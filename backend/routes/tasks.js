const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { topic, date, done } = req.body;
  if (!topic || !date) {
    return res.status(400).json({ error: 'Topic and date are required' });
  }
  try {
    const newTask = await Task.create({ topic, date, done });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { topic, date, done } = req.body;
  try {
    const [updated] = await Task.update(
      { topic, date, done },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.id);
      return res.json(updatedTask);
    }
    res.status(404).json({ error: 'Task not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Task.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.json({ message: 'Task deleted' });
    }
    res.status(404).json({ error: 'Task not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;