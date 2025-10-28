const express = require('express');
const path = require('path');

const app = express();

// Caminho correto para a build Angular
const angularAppPath = path.join(__dirname, 'dist/WebTemplate/browser');

// Serve arquivos estáticos
app.use(express.static(angularAppPath));

// Rota fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(angularAppPath, 'index.html'));
});

// Porta do Azure
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
