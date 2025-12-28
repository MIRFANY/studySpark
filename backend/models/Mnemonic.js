const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Mnemonic = sequelize.define('Mnemonic', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mnemonic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING), // For storing tags as an array of strings
    allowNull: true,
  }
});

module.exports = Mnemonic;