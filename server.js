const express = require('express');
const path = require('path');

const app = express();

// Caminho correto para a build Angular
const angularAppPath = path.join(__dirname, 'dist/WebTemplate/browser');

console.log('Angular app path:', angularAppPath);

// Middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve arquivos estáticos
app.use(express.static(angularAppPath));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    node_version: process.version,
    environment: process.env.NODE_ENV || 'production'
  });
});

// Rota fallback para SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(angularAppPath, 'index.html'));
});

// Porta do Azure
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'production'}`);
  console.log(`Node version: ${process.version}`);
});
