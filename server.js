const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const { Op } = require('sequelize');
const Usuario = require('./models/Usuario');
const Conversa = require('./models/Conversa');
const Historico = require('./models/Historico');

const app = express();
const port = 3000;

app.use(bodyParser.json());

sequelize.sync().then(() => {
  console.log('Database synced');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

// Rotas de usuários
app.post('/usuarios', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { username, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { username, senha } });
    if (usuario) {
      res.json({ message: 'Login successful', userId: usuario.id });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rotas de conversas
app.post('/conversas', async (req, res) => {
  try {
    const conversa = await Conversa.create(req.body);
    res.json(conversa);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/conversas', async (req, res) => {
  try {
    const conversas = await Conversa.findAll();
    res.json(conversas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Rota para obter conversas de um usuário
app.get('/conversas/usuario/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const conversas = await Conversa.findAll({
      where: {
        [Op.or]: [
          { fk_user_to: userId },
          { fk_user_from: userId }
        ]
      }
    });
    res.json(conversas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para obter um número específico de mensagens de uma conversa com opção de offset
app.get('/conversa/:conversaId/limit/:limitMsg/offset/:offsetMsg?', async (req, res) => {
  const { conversaId, limitMsg } = req.params;
  const offsetMsg = req.params.offsetMsg ? parseInt(req.params.offsetMsg, 10) : 0;
  const limit = parseInt(limitMsg, 10);

  const query = `
    SELECT * FROM historicos
    WHERE fk_id_conversa = :conversaId
    ORDER BY dt_msg_send ASC
    LIMIT :limit OFFSET :offsetMsg
  `;

  try {
    const results = await sequelize.query(query, {
      replacements: { conversaId, limit, offsetMsg },
      type: sequelize.QueryTypes.SELECT
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rotas de históricos
app.post('/historicos', async (req, res) => {
  try {
    const historico = await Historico.create(req.body);
    res.json(historico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/historicos', async (req, res) => {
  try {
    const historicos = await Historico.findAll();
    res.json(historicos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
