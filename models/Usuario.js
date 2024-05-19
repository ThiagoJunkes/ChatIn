const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('usuario', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  senha: { type: DataTypes.STRING, allowNull: false },
  nome_completo: { type: DataTypes.STRING, allowNull: false },
  apelido: { type: DataTypes.STRING },
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
