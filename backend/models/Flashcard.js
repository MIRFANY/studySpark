const { DataTypes }  = require('sequelize');
const sequelize = require('../db');

const Flashcard = sequelize.define('Flashcard', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: DataTypes.ARRAY(DataTypes.STRING),// optional for categorizing flashcards
        allowNull: true,
    }
});

module.exports = Flashcard;