const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const mnemonicsRouter = require('./routes/mnemonics');
const Mnemonic = require('./models/Mnemonic');
const Flashcard = require('./models/Flashcard');
const Task = require('./models/Task');
const flashcardsRouter = require('./routes/flashcards');
const tasksRouter = require('./routes/tasks');



require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Test DB connection and sync models
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected!');
    return sequelize.sync();
  })
  .then(() => console.log('All models were synchronized.'))
  .catch(err => console.error('Unable to connect to DB:', err));

// Test route
app.get('/', (req, res) => {
  res.send('yes irfan , the backend is running!');
});


// router for mnemonic

app.use('/api/mnemonics', mnemonicsRouter);

// mnemonics for flashcardRouter
app.use('/api/flashcards', flashcardsRouter);
app.use('/api/tasks', tasksRouter);







app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
