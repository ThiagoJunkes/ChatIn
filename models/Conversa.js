const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Conversa = sequelize.define('conversa', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  dt_criacao: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  fk_user_to: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  fk_user_from: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
}, {
  tableName: 'conversas',
  timestamps: false
});

module.exports = Conversa;
