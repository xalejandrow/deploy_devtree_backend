const express = require('express');

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hola Mundo en Express');
});

app.get('/ecommerce', (req, res) => {
  res.send('Este es el Ecommerce');
});

app.get('/blog', (req, res) => {
  res.send('Este es el Blog');
});

app.listen(4000, () => {
  console.log('Servidor Funcionando en el puerto 4000')
});