const express = require('express');

const app = express();

// Routing
app.get('/', (req, res) => {
  res.send('Hola Mundo en Express');
});

app.listen(4000, () => {
  console.log('Servidor Funcionando en el puerto 4000')
});
