const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Conversa = require('./Conversa');

const Historico = sequelize.define('historico', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mensagem: { type: DataTypes.TEXT, allowNull: false },
  fk_user: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    },
  },
  fk_id_conversa: {
    type: DataTypes.INTEGER,
    references: {
      model: Conversa,
      key: 'id',
    },
  },
  dt_msg_send: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  dt_msg_received: { type: DataTypes.DATE },
}, {
  tableName: 'historicos',
  timestamps: false
});

module.exports = Historico;
