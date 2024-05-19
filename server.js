const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
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

// Rotas de conversas
app.post('/conversas', async (req, res) => {
  try {
    console.log('Recebido JSON:', req.body);
    const conversa = await Conversa.create(req.body);
    console.log('Conversa criada:', conversa);
    res.json(conversa);
  } catch (err) {
    console.error('Erro ao criar conversa:', err.message);
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

async function testCreateConversa() {
  try {
    const conversa = await Conversa.create({ fk_user_to: 1, fk_user_from: 2 });
    console.log('Conversa criada manualmente:', conversa);
  } catch (err) {
    console.error('Erro ao criar conversa manualmente:', err.message);
  }
}

testCreateConversa();