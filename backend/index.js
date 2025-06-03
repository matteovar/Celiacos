const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let receitas = [];

app.get('/receitas', (req, res) => {
  res.json(receitas);
});

app.post('/receitas', (req, res) => {
  const novaReceita = req.body;
  receitas.push(novaReceita);
  res.status(201).json(novaReceita);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});