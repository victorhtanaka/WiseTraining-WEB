const express = require('express');
const path = require('path');

const app = express();

// Serve os arquivos estáticos do Angular
app.use(express.static(path.join(__dirname, 'dist/WebTemplate')));

// Rota padrão para o index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/WebTemplate/index.html'));
});

// Porta fornecida pelo Azure
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
