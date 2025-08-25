const express = require('express');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Dados simulados (como se fosse um banco de dados)
let usuarios = [
  { id: 1, nome: 'Ana', email: 'ana@email.com' },
  { id: 2, nome: 'João', email: 'joao@email.com' }
];

// Rota GET - listar todos os usuários
app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

// Rota GET - buscar usuário por ID
app.get('/usuarios/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  usuario ? res.json(usuario) : res.status(404).json({ erro: 'Usuário não encontrado' });
});

// Rota POST - adicionar novo usuário
app.post('/usuarios', (req, res) => {
  const novoUsuario = {
    id: usuarios.length + 1,
    nome: req.body.nome,
    email: req.body.email
  };
  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Rota DELETE - remover usuário por ID
app.delete('/usuarios/:id', (req, res) => {
  usuarios = usuarios.filter(u => u.id != req.params.id);
  res.json({ mensagem: 'Usuário removido com sucesso' });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${port}`);
});
